import { newRectangleApi as newRectangle } from './newRectangle';

describe('newRectangle', () => {
  it(
    'it should have all the same coordinates if two coordinates are equal',
    () => {
      const newRectangleData = newRectangle({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      } as ICommandDataRectangle);

      expect(newRectangleData).toEqual([[0, 0], [0, 0]]);

      const newRectangleData2 = newRectangle({
        x1: 2,
        y1: 2,
        x2: 2,
        y2: 2,
      } as ICommandDataRectangle);
      expect(newRectangleData2).toEqual([[2, 2], [2, 2]]);
    });

  it('it should have expected coordinates', () => {
    const newRectangleData = newRectangle({
      x1: 1,
      y1: 1,
      x2: 4,
      y2: 4,
    } as ICommandDataRectangle);
    const resultData = [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4],
      [1, 2],
      [1, 3],
      [4, 2],
      [4, 3],
    ];
    expect(newRectangleData).toEqual(resultData);

    const newRectangleData2 = newRectangle({
      x1: 4,
      y1: 4,
      x2: 1,
      y2: 1,
    } as ICommandDataRectangle);
    expect(newRectangleData2).toEqual(resultData);
  });
});
