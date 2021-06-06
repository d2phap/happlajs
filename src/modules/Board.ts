import { pause } from './helpers';

export type ZoomEventFunction = (zoomFactor: number, point: {
  x: number;
  y: number;
}) => void;

export type TransformEventFunction = (matrix: DOMMatrix) => void;
export type PanningEventFunction = ({ x, y }: { x: number, y: number }) => void;

export enum InterpolationMode {
  Pixelated = 'pixelated',
  Auto = 'auto',
  CrispEdges = 'crisp-edges',
}

export interface BoardOptions {
  allowZoom?: boolean;
  zoomFactor?: number;
  minZoom?: number;
  maxZoom?: number;

  allowPan?: boolean;
  panOffset?: { x: number, y: number };

  imageRendering?: InterpolationMode;

  onBeforeZoomChanged?: ZoomEventFunction;
  onAfterZoomChanged?: ZoomEventFunction;
  onAfterTransformed?: TransformEventFunction;
  onAfterPanOffsetChanged?: PanningEventFunction;
}

export class Board {
  private elBoardContent: HTMLElement;
  private elBoard: HTMLElement;
  private domMatrix: DOMMatrix;
  private isPointerDown = false;

  private options: BoardOptions;
  private defaultOptions: BoardOptions = {
    imageRendering: InterpolationMode.Pixelated,

    allowZoom: true,
    minZoom: 0.05,
    maxZoom: 10_000,
    zoomFactor: 1,
    panOffset: { x: 0, y: 0},

    allowPan: true,

    onBeforeZoomChanged: () => ({}),
    onAfterZoomChanged: () => ({}),
    onAfterTransformed: () => ({}),
    onAfterPanOffsetChanged: () =>({}),
  };

  constructor(board: HTMLElement, boardContent: HTMLElement, options?: BoardOptions) {
    this.elBoard = board;
    this.elBoardContent = boardContent;

    this.options = {
      ...this.defaultOptions,
      ...options || {},
    };

    this.domMatrix = new DOMMatrix();
    this.domMatrix.a = this.options.zoomFactor;
    this.domMatrix.d = this.options.zoomFactor;
    this.domMatrix.e = this.options.panOffset.x;
    this.domMatrix.f = this.options.panOffset.y;

    this.zoomTo = this.zoomTo.bind(this);
    this.zoomDistance = this.zoomDistance.bind(this);
    this.panTo = this.panTo.bind(this);
    this.moveDistance = this.moveDistance.bind(this);

    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.applyTransform = this.applyTransform.bind(this);
    this.waitForContentReady = this.waitForContentReady.bind(this);

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);

    this.disable();

    this.elBoardContent.style.transformOrigin = 'top left';
    this.elBoard.style.overflow = 'hidden';
  }

  //#region Getters & Setters
  get imageRendering() {
    return this.options.imageRendering;
  }

  set imageRendering(value: InterpolationMode) {
    this.options.imageRendering = value;
    this.elBoardContent.style.imageRendering = value;
  }
  //#endregion


  //#region Private functions
  private applyTransform(duration: number = 0) {
    return new Promise((resolve) => {
      this.elBoardContent.style.transform = `${this.domMatrix.toString()}`;

      // apply animation
      if (duration > 0) {
        const transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        this.elBoardContent.style.transition = transition;

        setTimeout(() => {
          // raise event
          this.options.onAfterTransformed(this.domMatrix);
          resolve(undefined);
        }, duration);
      }
      else {
        this.elBoardContent.style.transition = '';

        // raise event
        this.options.onAfterTransformed(this.domMatrix);
        resolve(undefined);
      }
    });
  }

  private onMouseWheel(e: WheelEvent) {
    // ignore horizontal scroll events
    if (e.deltaY === 0) {
      return;
    }

    const direction = e.deltaY < 0 ? 'up' : 'down';
    const normalizedDeltaY = 1 + Math.abs(e.deltaY) / 300; // speed
    const delta = direction === 'up' ? normalizedDeltaY : 1 / normalizedDeltaY;

    this.zoomDistance(delta, e.clientX, e.clientY);
  }

  private onPointerDown(e: PointerEvent) {
    // ignore right clicks
    if (e.button !== 0) {
      return;
    }

    this.isPointerDown = true;

    // We get the pointer position on click so we can get the value once the user starts to drag
    this.options.panOffset.x = e.clientX;
    this.options.panOffset.y = e.clientY;
  }

  private onPointerMove(event: PointerEvent) {
    // Only run this function if the pointer is down
    if (!this.isPointerDown) {
      return;
    }

    this.moveDistance(
      event.clientX - this.options.panOffset.x,
      event.clientY - this.options.panOffset.y,
    );

    this.options.panOffset.x = event.clientX;
    this.options.panOffset.y = event.clientY;
  }

  private onPointerUp(e: PointerEvent) {
    if (!this.isPointerDown) {
      return;
    }

    this.isPointerDown = false;

    this.options.panOffset.x += e.clientX - this.options.panOffset.x;
    this.options.panOffset.y += e.clientY - this.options.panOffset.y;

    this.options.onAfterPanOffsetChanged({
      x: this.domMatrix.e,
      y: this.domMatrix.f
    });
  }

  private moveDistance(x = 0, y = 0) {
    // Update the transform coordinates with the distance from origin and current position
    this.domMatrix.e += x;
    this.domMatrix.f += y;

    this.applyTransform();
  }

  private zoomDistance(delta: number, dx?: number, dy?: number, duration?: number) {
    if (!this.options.allowZoom) {
      return;
    }

    this.options.zoomFactor *= delta;

    // restrict the zoom factor
    this.options.zoomFactor = Math.min(
      Math.max(this.options.minZoom, this.options.zoomFactor),
      this.options.maxZoom,
    );

    // raise event onBeforeZoomChanged
    this.options.onBeforeZoomChanged(this.options.zoomFactor, {
      x: this.domMatrix.e,
      y: this.domMatrix.f,
    });

    const newX = (dx ?? this.elBoard.offsetLeft) - this.elBoard.offsetLeft;
    const newY = (dy ?? this.elBoard.offsetTop) - this.elBoard.offsetTop;

    this.domMatrix = new DOMMatrix()
      .translateSelf(newX, newY)
      .scaleSelf(delta)
      .translateSelf(-newX, -newY)
      .multiplySelf(this.domMatrix);

    // raise event onAfterZoomChanged
    this.options.onAfterZoomChanged(this.options.zoomFactor, {
      x: this.domMatrix.e,
      y: this.domMatrix.f,
    });

    this.applyTransform(duration);
  }
  //#endregion


  //#region Public functions
  public async panTo(x: number, y: number) {
    this.domMatrix.e = x;
    this.domMatrix.f = y;

    await this.applyTransform(300);
  }

  public async zoomTo(factor: number, x?: number, y?: number, duration?: number) {
    // restrict the zoom factor
    this.options.zoomFactor = Math.min(
      Math.max(this.options.minZoom, factor),
      this.options.maxZoom,
    );

    // raise event onBeforeZoomChanged
    this.options.onBeforeZoomChanged(this.options.zoomFactor, {
      x: this.domMatrix.e,
      y: this.domMatrix.f,
    });

    // apply scale and translate value
    this.domMatrix.a = this.options.zoomFactor;
    this.domMatrix.d = this.options.zoomFactor;
    this.domMatrix.e = x || 0;
    this.domMatrix.f = y || 0;

    // raise event onAfterZoomChanged
    this.options.onAfterZoomChanged(this.options.zoomFactor, {
      x: this.domMatrix.e,
      y: this.domMatrix.f,
    });

    await this.applyTransform(duration);
  }

  public enable() {
    this.applyTransform();

    this.elBoard.addEventListener('wheel', this.onMouseWheel, { passive: true });

    this.elBoard.addEventListener("pointerdown", this.onPointerDown);
    this.elBoard.addEventListener("pointerup", this.onPointerUp);
    this.elBoard.addEventListener("pointerleave", this.onPointerUp);
    this.elBoard.addEventListener("pointermove", this.onPointerMove);
  }

  public disable() {
    this.elBoard.removeEventListener('mousewheel', this.onMouseWheel);

    this.elBoard.removeEventListener("pointerdown", this.onPointerDown)
    this.elBoard.removeEventListener("pointerup", this.onPointerUp)
    this.elBoard.removeEventListener("pointerleave", this.onPointerUp);
    this.elBoard.removeEventListener("pointermove", this.onPointerMove);
  }

  public async waitForContentReady() {
    this.elBoardContent.style.opacity = '0';
    const list = this.elBoardContent.querySelectorAll('img');
    const imgs = Array.from(list);

    while(imgs.some(i => !i.complete)) {
      await pause(10);
    }

    this.elBoardContent.style.opacity = '1';
  }
  //#endregion
}
