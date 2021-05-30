
export type ZoomEventFunction = (zoomFactor: number, point: {
  x: number;
  y: number;
}) => void;

export type TransformEventFunction = (matrix: DOMMatrix) => void;

export enum InterpolationMode {
  Pixelated = 'pixelated',
  Auto = 'auto',
  CrispEdges = 'crisp-edges',
}

export interface BoardOptions {
  allowZoom?: boolean;
  allowPan?: boolean;
  zoomFactor?: number;
  minZoom?: number;
  maxZoom?: number;
  imageRendering?: InterpolationMode;

  onBeforeZoomChanged?: ZoomEventFunction;
  onAfterZoomChanged?: ZoomEventFunction;
  onAfterTransformed?: TransformEventFunction;
}

export class Board {
  private elBoardContent: HTMLElement;
  private elBoard: HTMLElement;
  private domMatrix: DOMMatrix;

  private options: BoardOptions;
  private defaultOptions: BoardOptions = {
    imageRendering: InterpolationMode.Pixelated,

    allowZoom: true,
    minZoom: 0.05,
    maxZoom: 2 ** 15,
    zoomFactor: 1,

    allowPan: true,

    onBeforeZoomChanged: () => ({}),
    onAfterZoomChanged: () => ({}),
    onAfterTransformed: () => ({}),
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

    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.applyTransform = this.applyTransform.bind(this);

    this.disable();
  }


  get imageRendering() {
    return this.options.imageRendering;
  }

  set imageRendering(value: InterpolationMode) {
    this.options.imageRendering = value;
    this.elBoardContent.style.imageRendering = value;
  }


  private applyTransform() {
    this.elBoardContent.style.transform = `${this.domMatrix}`;

    // raise event
    this.options.onAfterTransformed(this.domMatrix);
  }

  private handleMouseWheel(e: WheelEvent) {
    // ignore horizontal scroll events
    if (!this.options.allowZoom || e.deltaY === 0) {
      return;
    }

    const direction = e.deltaY < 0 ? 'up' : 'down';
    const normalizedDeltaY = 1 + Math.abs(e.deltaY) / 200;
    const currentZoomFactor = direction === 'up' ? normalizedDeltaY : 1 / normalizedDeltaY;
    const previousZoom = this.options.zoomFactor;
    this.options.zoomFactor *= currentZoomFactor;

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

    const x = e.clientX - this.elBoard.offsetLeft;
    const y = e.clientY - this.elBoard.offsetTop;

    this.domMatrix = new DOMMatrix()
      .translateSelf(x, y)
      .scaleSelf(currentZoomFactor)
      .translateSelf(-x, -y)
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

    this.elBoard.addEventListener('wheel', this.handleMouseWheel, {
      passive: true,
    });
  }

  public disable() {
    this.elBoard.removeEventListener('wheel', this.handleMouseWheel);
  }
}
