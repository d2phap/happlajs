
declare type TZoomEventArgs = {
  zoomFactor: number,
  x: number,
  y: number,
  isManualZoom: boolean,
  isZoomModeChanged: boolean,
};

declare type TPanningEventArgs = {
  x: number,
  y: number,
};

declare type TPanDirection = 'left' | 'right' | 'up' | 'down';
declare type TInterpolationMode = 'auto' | 'pixelated';

declare type TZoomMode = 'AutoZoom'
  | 'LockZoom'
  | 'ScaleToWidth'
  | 'ScaleToHeight'
  | 'ScaleToFit'
  | 'ScaleToFill';

declare type THapplaBoxOptions = {
  allowZoom: boolean,
  zoomFactor: number,
  minZoom: number,
  maxZoom: number,

  allowPan: boolean,
  panOffset: DOMPoint,

  imageRendering: TInterpolationMode,
  scaleRatio: number,
  padding: DOMPadding,
}
