import { newLineApi } from './newLine';

describe('newLineApi', () => {
  it('it should have a length, 1 if two coordinates are equal', () => {
    const newLineData = newLineApi({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    } as ICommandDataLine);
    expect(newLineData).toEqual([[0, 0]]);

    const newLineData2 = newLineApi({
      x1: 2,
      y1: 2,
      x2: 2,
      y2: 2,
    } as ICommandDataLine);
    expect(newLineData2).toEqual([[2, 2]]);
  });

  it('it should have the same y coordinate', () => {
    const newLineData = newLineApi({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 1,
    } as ICommandDataLine);

    const result = [[1, 1], [2, 1], [3, 1], [4, 1]];

    expect(newLineData).toEqual(result);

    const newLineData2 = newLineApi({
      x1: 4,
      y1: 1,
      x2: 1,
      y2: 1,
    } as ICommandDataLine);
    expect(newLineData2).toEqual(result);
  });

  it('it should have the same x coordinate', () => {
    const newLineData = newLineApi({
      x1: 1,
      y1: 1,
      x2: 1,
      y2: 4,
    } as ICommandDataLine);

    const result = [[1, 1], [1, 2], [1, 3], [1, 4]];

    expect(newLineData).toEqual(result);

    const newLineData2 = newLineApi({
      x1: 1,
      y1: 4,
      x2: 1,
      y2: 1,
    } as ICommandDataLine);
    expect(newLineData2).toEqual(result);
  });

  it('it is neithor horizontal nor vertical lines', () => {
    const newLineData = newLineApi({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 4,
    } as ICommandDataLine);
    expect(newLineData).toEqual([]);
  });
});
