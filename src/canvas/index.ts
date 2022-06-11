import {newLineApi} from './newLine';
import {fillApi} from './fill';
import {newRectangleApi} from './newRectangle';
import {DrawValue} from '../config';

export class DrawCanvas {
  canvasData: CanvasData;
  constructor() {
    this.canvasData = [];
  }
  render() {
    if (!this.canvasData || !this.canvasData.length) {
      return;
    }
    const yAxisArr = this.canvasData;
    const height = yAxisArr.length;
    const width = yAxisArr[0].length;
    for (let y = 0; y < height; y++) {
      const xAxisArr = yAxisArr[y];
      let oneLineData = '';
      for (let x = 0; x < width; x++) {
        const xVal = xAxisArr[x];
        oneLineData += xVal.draw;
      }
      console.log(oneLineData);
    }
  }
  updateCanvasData(updateData: LineData, drawValue: string = DrawValue.DEFAULT_DRAW_VALUE) {
    const len = updateData.length;
    for (let i = 0; i < len; i++) {
      const dataCoordinate = updateData[i];
      const x = dataCoordinate[0];
      const y = dataCoordinate[1];
      // In case out of boundaries
      if (this.canvasData[y] && this.canvasData[y][x]) {
        const canvasDataCoordinate = this.canvasData[y][x];
        if (canvasDataCoordinate.draw === DrawValue.INIT_DRAW_VALUE) {
          canvasDataCoordinate.draw = drawValue;
        }
      }
    }
  }
  createCanvas(data: ICommandDataCanvas) {
    if (data.w === 0 || data.h === 0) {
      return;
    }
    const yAxisArr: CanvasData = [];
    const border = 2;
    const height = data.h + border;
    const yAxisEnd = height - 1;
    const width = data.w + border;
    const xAxisEnd = width - 1;
    for (let y = 0; y < height; y++) {
      const xAxisArr: PointData[] = [];
      for (let x = 0; x < width; x++) {
        let drawValue = DrawValue.INIT_DRAW_VALUE;
        if (y === 0 || y === yAxisEnd) {
          drawValue = DrawValue.X_BORDER_VALUE;
        } else if (x === 0 || x === xAxisEnd) {
          drawValue = DrawValue.Y_BORDER_VALUE;
        }
        xAxisArr.push({
          draw: drawValue,
        });
      }
      yAxisArr.push(xAxisArr);
    }
    this.canvasData = yAxisArr;
    this.render();
  }
  newLine(data: ICommandDataLine) {
    const newLineData = newLineApi(data);
    this.updateCanvasData(newLineData);
    this.render();
  }
  newRectangle(data: ICommandDataRectangle) {
    const newRectangleData = newRectangleApi(data);
    this.updateCanvasData(newRectangleData);
    this.render();
  }
  fill(data: ICommandDataFill) {
    const newFillData= fillApi(data, this.canvasData);
    this.updateCanvasData(newFillData, data.c);
    this.render();
  }
}
