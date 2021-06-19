import { pause } from './helpers';

export type ZoomEventFunction = (zoomFactor: number, x: number, y: number) => void;
export type TransformEventFunction = (matrix: DOMMatrix) => void;
export type PanEventFunction = (x: number, y: number) => void;

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
  scaleRatio?: number;

  onBeforeContentReady?: () => void;
  onContentReady?: () => void;

  onBeforeZoomChanged?: ZoomEventFunction;
  onAfterZoomChanged?: ZoomEventFunction;
  onAfterTransformed?: TransformEventFunction;

  onPanning?: PanEventFunction;
  onAfterPanned?: PanEventFunction;
}

export class Board {
  private elBoardContent: HTMLElement;
  private elBoard: HTMLElement;
  private domMatrix: DOMMatrix;
  private isPointerDown = false;

  private animationFrame: number;
  private isMoving = false;
  private arrowLeftDown = false;
  private arrowRightDown = false;
  private arrowUpDown = false;
  private arrowDownDown = false;

  private options: BoardOptions;
  private defaultOptions: BoardOptions = {
    imageRendering: InterpolationMode.Pixelated,

    allowZoom: true,
    minZoom: 0.1,
    maxZoom: 150,
    zoomFactor: 1,
    panOffset: { x: 0, y: 0 },

    allowPan: true,
    scaleRatio: window.devicePixelRatio,

    onBeforeContentReady: () => {},
    onContentReady: () => {},

    onBeforeZoomChanged: () => {},
    onAfterZoomChanged: () => {},
    onAfterTransformed: () => {},

    onPanning: () => {},
    onAfterPanned: () => {},
  };

  constructor(board: HTMLElement, boardContent: HTMLElement, options?: BoardOptions) {
    this.elBoard = board;
    this.elBoardContent = boardContent;

    this.options = {
      ...this.defaultOptions,
      ...options || {},
    };

    this.domMatrix = new DOMMatrix()
      .scaleSelf(this.options.zoomFactor)
      .translateSelf(this.options.panOffset.x, this.options.panOffset.y);

    this.zoomDistance = this.zoomDistance.bind(this);
    this.moveDistance = this.moveDistance.bind(this);
    this.startMoving = this.startMoving.bind(this);
    this.stopMoving = this.stopMoving.bind(this);
    this.dpi = this.dpi.bind(this);

    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.zoomTo = this.zoomTo.bind(this);
    this.panTo = this.panTo.bind(this);
    this.applyTransform = this.applyTransform.bind(this);
    this.waitForContentReady = this.waitForContentReady.bind(this);

    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.disable();

    this.elBoardContent.style.transformOrigin = 'top left';
    this.elBoard.style.touchAction = 'none';
    this.elBoard.style.overflow = 'hidden';

    // emit event onBeforeContentReady
    this.options.onBeforeContentReady();
  }

  // #region Getters & Setters
  get imageRendering() {
    return this.options.imageRendering;
  }

  set imageRendering(value: InterpolationMode) {
    this.options.imageRendering = value;
    this.elBoardContent.style.imageRendering = value;
  }

  get scaleRatio() {
    return this.options.scaleRatio;
  }

  set scaleRatio(value: number) {
    this.options.scaleRatio = value;
  }

  /**
   * Gets zoom factor after computing device ratio (DPI)
   *
   * @readonly
   * @memberof Board
   */
  get zoomFactor() {
    return this.options.zoomFactor * this.options.scaleRatio;
  }
  // #endregion


  // #region Private functions
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

    this.elBoard.setPointerCapture(e.pointerId);
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

    this.options.onPanning(this.domMatrix.e, this.domMatrix.f);
  }

  private onPointerUp(e: PointerEvent) {
    if (!this.isPointerDown) {
      return;
    }

    this.elBoard.releasePointerCapture(e.pointerId);
    this.isPointerDown = false;

    this.options.panOffset.x += e.clientX - this.options.panOffset.x;
    this.options.panOffset.y += e.clientY - this.options.panOffset.y;

    this.options.onAfterPanned(this.domMatrix.e, this.domMatrix.f);
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.arrowLeftDown = true;
        if (!this.isMoving) {
          this.isMoving = true;
          this.startMoving();
        }
        break;
      case 'ArrowUp':
        this.arrowUpDown = true;
        if (!this.isMoving) {
          this.isMoving = true;
          this.startMoving();
        }
        break;
      case 'ArrowRight':
        this.arrowRightDown = true;
        if (!this.isMoving) {
          this.isMoving = true;
          this.startMoving();
        }
        break;
      case 'ArrowDown':
        this.arrowDownDown = true;
        if (!this.isMoving) {
          this.isMoving = true;
          this.startMoving();
        }
        break;
      default:
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.arrowLeftDown = false;
        break;
      case 'ArrowUp':
        this.arrowUpDown = false;
        break;
      case 'ArrowRight':
        this.arrowRightDown = false;
        break;
      case 'ArrowDown':
        this.arrowDownDown = false;
        break;
      default:
        break;
    }

    if ([
      this.arrowLeftDown,
      this.arrowUpDown,
      this.arrowRightDown,
      this.arrowDownDown,
    ].every((keyDown) => !keyDown)) {
      this.stopMoving();
    }
  }

  private dpi(value: number) {
    return value / this.options.scaleRatio;
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

    // update the current zoom factor
    this.options.zoomFactor = this.domMatrix.a;

    const oldZoom = this.options.zoomFactor;
    const newZoom = oldZoom * delta;

    // raise event onBeforeZoomChanged
    this.options.onBeforeZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);

    // restrict the zoom factor
    this.options.zoomFactor = Math.min(
      Math.max(this.options.minZoom, newZoom),
      this.options.maxZoom,
    );

    const newX = (dx ?? this.elBoard.offsetLeft) - this.elBoard.offsetLeft;
    const newY = (dy ?? this.elBoard.offsetTop) - this.elBoard.offsetTop;
    let newDelta = delta;

    // check zoom -> maxZoom
    if (newZoom * this.options.scaleRatio > this.options.maxZoom) {
      newDelta = this.dpi(this.options.maxZoom) / oldZoom;
      this.options.zoomFactor = this.dpi(this.options.maxZoom);
    }

    // check zoom -> minZoom
    else if (newZoom * this.options.scaleRatio < this.options.minZoom) {
      newDelta = this.dpi(this.options.minZoom) / oldZoom;
      this.options.zoomFactor = this.dpi(this.options.minZoom);
    }

    this.domMatrix = new DOMMatrix()
      .translateSelf(newX, newY)
      .scaleSelf(newDelta)
      .translateSelf(-newX, -newY)
      .multiplySelf(this.domMatrix);

    // raise event onAfterZoomChanged
    this.options.onAfterZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);

    this.applyTransform(duration);
  }

  private startMoving() {
    const speed = Math.ceil(this.elBoardContent.clientWidth / 100);
    let x = 0;
    let y = 0;

    if (this.arrowLeftDown && !this.arrowRightDown) {
      x = speed;
    } else if (!this.arrowLeftDown && this.arrowRightDown) {
      x = -speed;
    }

    if (this.arrowUpDown && !this.arrowDownDown) {
      y = speed;
    } else if (!this.arrowUpDown && this.arrowDownDown) {
      y = -speed;
    }

    this.moveDistance(x, y);
    this.animationFrame = requestAnimationFrame(this.startMoving);
  }

  private stopMoving() {
    cancelAnimationFrame(this.animationFrame);
    this.isMoving = false;
  }
  // #endregion


  // #region Public functions
  public async panTo(x: number, y: number, duration?: number) {
    this.domMatrix.e = x;
    this.domMatrix.f = y;

    await this.applyTransform(duration);
  }

  public async zoomTo(factor: number, x?: number, y?: number, duration?: number) {
    // restrict the zoom factor
    this.options.zoomFactor = Math.min(
      Math.max(this.options.minZoom, this.dpi(factor)),
      this.options.maxZoom,
    );

    // raise event onBeforeZoomChanged
    this.options.onBeforeZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);

    // apply scale and translate value
    this.domMatrix.a = this.options.zoomFactor;
    this.domMatrix.d = this.options.zoomFactor;
    this.domMatrix.e = x || 0;
    this.domMatrix.f = y || 0;

    // raise event onAfterZoomChanged
    this.options.onAfterZoomChanged(this.zoomFactor, this.domMatrix.e, this.domMatrix.f);

    await this.applyTransform(duration);
  }

  public applyTransform(duration: number = 0) {
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

  public enable() {
    this.applyTransform();

    this.elBoard.addEventListener('wheel', this.onMouseWheel, { passive: true });

    this.elBoard.addEventListener('pointerdown', this.onPointerDown);
    this.elBoard.addEventListener('pointerup', this.onPointerUp);
    this.elBoard.addEventListener('pointerleave', this.onPointerUp);
    this.elBoard.addEventListener('pointermove', this.onPointerMove);

    this.elBoard.addEventListener('keydown', this.onKeyDown);
    this.elBoard.addEventListener('keyup', this.onKeyUp);
  }

  public disable() {
    this.elBoard.removeEventListener('mousewheel', this.onMouseWheel);

    this.elBoard.removeEventListener('pointerdown', this.onPointerDown);
    this.elBoard.removeEventListener('pointerup', this.onPointerUp);
    this.elBoard.removeEventListener('pointerleave', this.onPointerUp);
    this.elBoard.removeEventListener('pointermove', this.onPointerMove);

    this.elBoard.removeEventListener('keydown', this.onKeyDown);
    this.elBoard.removeEventListener('keyup', this.onKeyUp);
  }

  public async waitForContentReady() {
    const list = this.elBoardContent.querySelectorAll('img');
    const imgs = Array.from(list);

    while (imgs.some((i) => !i.complete)) {
      // eslint-disable-next-line
      await pause(10);
    }

    // emit event onContentReady
    this.options.onContentReady();
  }
  // #endregion
}
