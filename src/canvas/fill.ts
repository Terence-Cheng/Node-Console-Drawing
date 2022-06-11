import {DrawValue} from '../config';

type CoordData2CoordData = (a: CoordData) => CoordData

const moveUp: CoordData2CoordData = (coord) => {
  const x = coord[0];
  const y = coord[1];
  return [x, y - 1];
};

const moveDown: CoordData2CoordData = (coord) => {
  const x = coord[0];
  const y = coord[1];
  return [x, y + 1];
};

const moveLeft: CoordData2CoordData = (coord) => {
  const x = coord[0];
  const y = coord[1];
  return [x - 1, y];
};

const moveRight: CoordData2CoordData = (coord) => {
  const x = coord[0];
  const y = coord[1];
  return [x + 1, y];
};

export const fillApi = (data: ICommandDataFill, canvasData: CanvasData): LineData => {
  const lineData: LineData = [];
  const fillRecords: Set<string> = new Set();

  const canFillCoord = (target: CoordData): boolean => {
    const x = target[0];
    const y = target[1];
    if (canvasData[y] && canvasData[y][x]) {
      const coord = canvasData[y][x];
      return coord.draw === DrawValue.INIT_DRAW_VALUE && !fillRecords.has(target.join(','));
    }

    return false;
  };

  const fillSelfAndNeiborhoods = (target: CoordData) => {
    if(!canFillCoord(target)) {
      return;
    }

    // push to the result
    lineData.push(target);

    // mark the target has pushed into the result
    fillRecords.add(target.join(','));

    // check up, down, left, right
    fillSelfAndNeiborhoods(moveUp(target));
    fillSelfAndNeiborhoods(moveDown(target));
    fillSelfAndNeiborhoods(moveLeft(target));
    fillSelfAndNeiborhoods(moveRight(target));
  };

  // drawValue = data.c;
  const coord: CoordData = [data.x, data.y];

  fillSelfAndNeiborhoods(coord);

  return lineData;
};
