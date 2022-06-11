import { COMMAND_ENUM } from '../src/config';

declare global {
  interface ICommandData {
    command: COMMAND_ENUM
  }

  interface ICommandDataCanvas extends ICommandData {
    command: COMMAND_ENUM.NEW_CANVAS,
    w: number,
    h: number,
  }

  interface ICommandDataLine extends ICommandData {
    command: COMMAND_ENUM.NEW_LINE,
    x1: number,
    x2: number,
    y1: number,
    y2: number,
  }

  interface ICommandDataRectangle extends ICommandDataLine {
    command: COMMAND_ENUM.NEW_RECTANGLE,
  }

  interface ICommandDataFill extends ICommandData {
    command: COMMAND_ENUM.FILL,
    x: number,
    y: number,
    c: string,
  }

  type PointData = {
    draw: string,
  }

  type CanvasData = Array<Array<PointData>>

  type CoordData = [number, number]

  type LineData = CoordData[] //Array<Array<number, number>>
}
