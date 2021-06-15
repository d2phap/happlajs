export declare type ZoomEventFunction = (zoomFactor: number, x: number, y: number) => void;
export declare type TransformEventFunction = (matrix: DOMMatrix) => void;
export declare type PanEventFunction = (x: number, y: number) => void;
export declare enum InterpolationMode {
    Pixelated = "pixelated",
    Auto = "auto",
    CrispEdges = "crisp-edges"
}
export interface BoardOptions {
    allowZoom?: boolean;
    zoomFactor?: number;
    minZoom?: number;
    maxZoom?: number;
    allowPan?: boolean;
    panOffset?: {
        x: number;
        y: number;
    };
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
export declare class Board {
    private elBoardContent;
    private elBoard;
    private domMatrix;
    private isPointerDown;
    private animationFrame;
    private isMoving;
    private arrowLeftDown;
    private arrowRightDown;
    private arrowUpDown;
    private arrowDownDown;
    private options;
    private defaultOptions;
    constructor(board: HTMLElement, boardContent: HTMLElement, options?: BoardOptions);
    get imageRendering(): InterpolationMode;
    set imageRendering(value: InterpolationMode);
    /**
     * Gets zoom factor after computing device ratio (DPI)
     *
     * @readonly
     * @memberof Board
     */
    get zoomFactor(): number;
    private onMouseWheel;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    private onKeyDown;
    private onKeyUp;
    private dpi;
    private moveDistance;
    private zoomDistance;
    private startMoving;
    private stopMoving;
    panTo(x: number, y: number): Promise<void>;
    zoomTo(factor: number, x?: number, y?: number, duration?: number): Promise<void>;
    applyTransform(duration?: number): Promise<unknown>;
    enable(): void;
    disable(): void;
    waitForContentReady(): Promise<void>;
}
