
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
  onPanOffsetChanged?: PanningEventFunction;
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
    maxZoom: 2 ** 15,
    zoomFactor: 1,
    panOffset: { x: 0, y: 0},

    allowPan: true,

    onBeforeZoomChanged: () => ({}),
    onAfterZoomChanged: () => ({}),
    onAfterTransformed: () => ({}),
    onPanOffsetChanged: () =>({}),
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
    this.panTo = this.panTo.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.applyTransform = this.applyTransform.bind(this);

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.moveDistance = this.moveDistance.bind(this);

    this.disable();
  }


  get imageRendering() {
    return this.options.imageRendering;
  }

  set imageRendering(value: InterpolationMode) {
    this.options.imageRendering = value;
    this.elBoardContent.style.imageRendering = value;
  }


  private applyTransform(duration: number = 0) {
    this.elBoardContent.style.transform = `${this.domMatrix}`;
    this.elBoardContent.style.transition = 'transform 10ms ease';

    const transition = duration > 0 ? `transform ${duration}ms ease` : '';
    this.elBoardContent.style.transition = transition;

    // raise event
    this.options.onAfterTransformed(this.domMatrix);
  }

  private onMouseWheel(e: WheelEvent) {
    // ignore horizontal scroll events
    if (e.deltaY === 0) {
      return;
    }

    const direction = e.deltaY < 0 ? 'up' : 'down';
    const normalizedDeltaY = 1 + Math.abs(e.deltaY) / 300; // speed
    const delta = direction === 'up' ? normalizedDeltaY : 1 / normalizedDeltaY;
    const newZoom = this.options.zoomFactor * delta;

    this.zoomTo(newZoom, e.clientX, e.clientY);
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

    this.moveDistance({
      x: event.clientX - this.options.panOffset.x,
      y: event.clientY - this.options.panOffset.y
    });

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

    this.options.onPanOffsetChanged({
      x: this.domMatrix.e,
      y: this.domMatrix.f
    });
  }

  private moveDistance({ x = 0, y = 0 }) {
    // Update the transform coordinates with the distance from origin and current position
    this.domMatrix.e += x;
    this.domMatrix.f += y;

    this.applyTransform();
  }

  public panTo(x: number, y: number) {
    this.domMatrix.e = x;
    this.domMatrix.f = y;

    this.applyTransform(300);
  }

  public zoomTo(factor: number, x?: number, y?: number) {
    if (!this.options.allowZoom) {
      return;
    }

    const previousZoom = this.options.zoomFactor;
    this.options.zoomFactor = factor;

    // if larger than maxZoom, stay at previousZoom
    if (this.options.zoomFactor > this.options.maxZoom) {
      this.options.zoomFactor = previousZoom;
    }

    // if smaller than minZoom, stay at previous zoom
    if (this.options.zoomFactor < this.options.minZoom) {
      this.options.zoomFactor = previousZoom;
    }

    if (this.options.zoomFactor === previousZoom) {
      return;
    }

    // raise event onBeforeZoomChanged
    this.options.onBeforeZoomChanged(this.options.zoomFactor, {
      x: this.domMatrix.e,
      y: this.domMatrix.f,
    });

    const newX = (x ?? this.elBoard.offsetLeft) - this.elBoard.offsetLeft;
    const newY = (y ?? this.elBoard.offsetTop) - this.elBoard.offsetTop;
    const delta = factor / previousZoom;

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

    this.applyTransform();
  }

  public enable() {
    this.elBoardContent.style.transformOrigin = 'top left';
    this.elBoardContent.style.height = '100%';
    this.elBoard.style.overflow = 'hidden';

    this.applyTransform();

    this.elBoard.addEventListener('mousewheel', this.onMouseWheel, {
      passive: true,
    });

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
}
