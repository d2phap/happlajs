export interface IRect {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export declare const pause: (duration: number) => Promise<unknown>;
export declare const checkRectanglesIntersection: (rectangle1: IRect, rectangle2: IRect) => boolean;
