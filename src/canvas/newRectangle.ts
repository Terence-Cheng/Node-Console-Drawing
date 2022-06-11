import { newLineApi } from './newLine';

type GetRectangleData = (x1: number, x2: number, y1: number, y2: number) => LineData


const doGetRectangleData: GetRectangleData = (smallX, smallY, bigX, bigY) => {
  const rectangleData: LineData = [];
  // top line
  rectangleData.push(...newLineApi({
    x1: smallX,
    y1: smallY,
    x2: bigX,
    y2: smallY,
  } as ICommandDataLine));

  // bottom line
  rectangleData.push(...newLineApi({
    x1: smallX,
    y1: bigY,
    x2: bigX,
    y2: bigY,
  } as ICommandDataLine));

  if(smallY + 1 <= bigY - 1) {
    // left line
    rectangleData.push(...newLineApi({
      x1: smallX,
      y1: smallY + 1,
      x2: smallX,
      y2: bigY - 1,
    } as ICommandDataLine));

    // right line
    rectangleData.push(...newLineApi({
      x1: bigX,
      y1: smallY + 1,
      x2: bigX,
      y2: bigY - 1,
    } as ICommandDataLine));
  }
  return rectangleData;
};

const getRectangleData: GetRectangleData = (x1, y1, x2, y2) => {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);

  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);

  return doGetRectangleData(minX, minY, maxX, maxY);
};

export const newRectangleApi = (data: ICommandDataRectangle): LineData => {
  return getRectangleData(data.x1, data.y1, data.x2, data.y2);
};
