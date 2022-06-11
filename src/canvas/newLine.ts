type GetLineData = (x1: number, x2: number, y1: number, y2: number) => LineData

const axisParallelLine = (sameVal: number, isXvalueSame: boolean, start: number, end: number): LineData => {
  const startIndex = Math.min(start, end);
  const endIndex = Math.max(start, end);

  const lineData: LineData = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const coordinate: CoordData = isXvalueSame ? [sameVal, i] : [i, sameVal];
    lineData.push(coordinate);
  }

  return lineData;
};


const getLineData: GetLineData = (x1, y1, x2, y2) => {
  let lineData: LineData = [];
  if (x1 === x2) {
    lineData = axisParallelLine(x1, true, y1, y2);
  } else if (y1 === y2) {
    lineData = axisParallelLine(y1, false, x1, x2);
  }
  return lineData;
};

export const newLineApi = (data: ICommandDataLine): LineData => {
  const lineData = getLineData(data.x1, data.y1, data.x2, data.y2);
  return lineData;
};

