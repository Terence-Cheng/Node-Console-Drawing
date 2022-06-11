import { COMMAND_ENUM, ERROR_MSG } from './config';
import { DrawCanvas } from './canvas/index';


let drawCanvas: DrawCanvas;

const hasDrawCanvas = (): boolean => {
  if (drawCanvas) {
    return true;
  }
  console.log(ERROR_MSG.NO_CANVAS + '..!!');
  return false;
};


export const handleCommand = (data: ICommandData) => {
  if (data.command === COMMAND_ENUM.INCORRECT_COMMAND) {
    console.log(COMMAND_ENUM.INCORRECT_COMMAND + '..!!');
    return;
  }

  if (data.command === COMMAND_ENUM.QUIT) {
    console.log(COMMAND_ENUM.QUIT + '..!!');
    process.exit();
  }

  if (data.command === COMMAND_ENUM.NEW_CANVAS) {
    drawCanvas = new DrawCanvas();
    drawCanvas.createCanvas(data as ICommandDataCanvas);
    return;
  }


  if (hasDrawCanvas()) {
    if (data.command === COMMAND_ENUM.NEW_LINE) {
      drawCanvas.newLine(data as ICommandDataLine);
    } else if (data.command === COMMAND_ENUM.NEW_RECTANGLE) {
      drawCanvas.newRectangle(data as ICommandDataRectangle);
    } else if (data.command === COMMAND_ENUM.FILL) {
      drawCanvas.fill(data as ICommandDataFill);
    }
  }
};
