
export interface IRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const pause = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const checkRectanglesIntersection = (rectangle1: IRect, rectangle2: IRect) => !(
  rectangle2.left > rectangle1.right
  || rectangle2.right < rectangle1.left
  || rectangle2.top > rectangle1.bottom
  || rectangle2.bottom < rectangle1.top
);
