// @ts-nocheck
import { Board, InterpolationMode } from '@d2phap/happla';

const elBoard = document.getElementById('board');
const elBoardContent = document.getElementById('boardContent');
const board = new Board(elBoard, elBoardContent, {
  //
});

const img = document.getElementById('img');

var poll = new Promise((resolve) => {
  setInterval(function () {
    if (img.naturalWidth) {
      clearInterval(poll);

      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    }
  }, 5);
});

poll.then(({ width, height }) => {
  board.imageRendering = InterpolationMode.Pixelated;
  console.log(board.imageRendering);

  board.enable();

  const scaleWidth = elBoard.clientWidth / width;
  const scaleHeight = elBoard.clientHeight / height;
  const scale = Math.min(scaleWidth, scaleHeight);

  const x = ((elBoard.clientWidth) * scale) / 2;
  const y = ((elBoard.clientHeight) * scale) / 2;

  console.log(`${x}, ${y}`);
  board.zoomTo(scale, x, y);

  board.panTo(-200, -200);
});
