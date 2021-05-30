
import { Board, InterpolationMode } from '@d2phap/happla';

const elBoard = document.getElementById('board');
const elBoardContent = document.getElementById('boardContent');
const board = new Board(elBoard, elBoardContent, {
  //
});

board.imageRendering = InterpolationMode.Pixelated;
console.log(board.imageRendering);

board.enable();
