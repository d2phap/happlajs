export declare type ZoomEventFunction = (zoomFactor: number, point: {
    x: number;
    y: number;
}) => void;
export declare type TransformEventFunction = (matrix: DOMMatrix) => void;
export declare type PanningEventFunction = ({ x, y }: {
    x: number;
    y: number;
}) => void;
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
    onBeforeZoomChanged?: ZoomEventFunction;
    onAfterZoomChanged?: ZoomEventFunction;
    onAfterTransformed?: TransformEventFunction;
    onAfterPanOffsetChanged?: PanningEventFunction;
}
export declare class Board {
    private elBoardContent;
    private elBoard;
    private domMatrix;
    private isPointerDown;
    private animationFrame;
    private moving;
    private arrowLeftDown;
    private arrowRightDown;
    private arrowUpDown;
    private arrowDownDown;
    private options;
    private defaultOptions;
    constructor(board: HTMLElement, boardContent: HTMLElement, options?: BoardOptions);
    get imageRendering(): InterpolationMode;
    set imageRendering(value: InterpolationMode);
    private applyTransform;
    private onMouseWheel;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    private onKeyDown;
    private onKeyUp;
    private moveDistance;
    private zoomDistance;
    private startMoving;
    private stopMoving;
    panTo(x: number, y: number): Promise<void>;
    zoomTo(factor: number, x?: number, y?: number, duration?: number): Promise<void>;
    enable(): void;
    disable(): void;
    waitForContentReady(): Promise<void>;
}
