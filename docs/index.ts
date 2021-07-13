// @ts-nocheck
import { Board, InterpolationMode, PanEventFunction, ZoomEventFunction } from '@d2phap/happla';

const elBoard = document.getElementById('board');
const elWrapper = document.getElementById('wrapper');
const elBoardContent = document.getElementById('boardContent');

const elScaleRatio = document.getElementById('elScaleRatio');
const elZoom = document.getElementById('elZoom');
const elX = document.getElementById('elX');
const elY = document.getElementById('elY');
const elWidth = document.getElementById('elWidth');
const elHeight = document.getElementById('elHeight');


const onAfterZoomChanged: ZoomEventFunction = (factor: number, x: number, y: number) => {
  elScaleRatio.innerText = board.scaleRatio;
  elZoom.innerText = factor;
  elX.innerText = x;
  elY.innerText = y;
  elWidth.innerText = `${elBoardContent.clientWidth * factor}px (${elBoardContent.clientWidth}px)`;
  elHeight.innerText = `${elBoardContent.clientHeight * factor}px (${elBoardContent.clientHeight}px)`;
};

const onPanning: PanEventFunction = (x: number, y: number) => {
  elX.innerText = x;
  elY.innerText = y;
};

const onBeforeContentReady = () => {
  elWrapper.style.opacity = 0;
  elWrapper.style.transition = 'opacity ease 0ms';
};

const onContentReady = () => {
  // elBoardContent.style.opacity = 1;
  // elBoardContent.style.transition = '';
};


const board = new Board(elBoard, elBoardContent, {
  onAfterZoomChanged,
  onPanning,
  onBeforeContentReady,
  onContentReady,
});


board.imageRendering = InterpolationMode.Pixelated;
board.waitForContentReady()
  .then(async () => {
    board.enable();

    const w = elBoardContent.scrollWidth / board.scaleRatio;
    const h = elBoardContent.scrollHeight / board.scaleRatio;

    const widthScale = elBoard.clientWidth / w;
    const heightScale = elBoard.clientHeight / h;
    const scale = Math.min(widthScale, heightScale);

    const x = (elBoard.offsetWidth - (w * scale)) / 2;
    const y = (elBoard.offsetHeight - (h * scale)) / 2;

    await board.panTo(-w/2, -h/2);
    board.zoomTo(scale, x, y);

    elWrapper.style.opacity = 1;
  });

// const img = document.getElementById('img');

// var poll = new Promise((resolve) => {
//   setInterval(function () {
//     if (img.naturalWidth) {
//       clearInterval(poll);

//       resolve({
//         width: img.naturalWidth,
//         height: img.naturalHeight,
//       });
//     }
//   }, 5);
// });

// poll.then(async ({ width, height }) => {
//   board.imageRendering = InterpolationMode.Pixelated;
//   console.log(board.imageRendering);

//   board.enable();

//   const w = elBoardContent.scrollWidth;
//   const h = elBoardContent.scrollHeight;

//   const widthScale = elBoard.clientWidth / w;
//   const heightScale = elBoard.clientHeight / h;
//   const scale = Math.min(widthScale, heightScale);

//   const x = (elBoard.offsetWidth - (w * scale)) / 2;
//   const y = (elBoard.offsetHeight - (h * scale)) / 2;

//   console.log(`${x}, ${y}`);
//   await board.zoomTo(scale, x, y);

//   // board.panTo(0, 0);
// });

