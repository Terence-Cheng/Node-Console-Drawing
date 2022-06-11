import { fillApi } from './fill';

describe('fillApi', () => {
  it('test1', () => {
    //    step1             step2             step3
    //    ------            ------            ------
    //    |xxx |            |xxxA|            |xxxA|
    //    |x x |    ===>    |xox |    ===>    |xoxA|
    //    |xxx |            |xxx |            |xxxA|
    //    |    |            |    |            |AAAA|
    //    ------            ------            ------
    let canvasData =  [
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
    ];
    let newLineData = fillApi({
      c: 'o',
      x: 2,
      y: 2,
    } as ICommandDataFill, canvasData);

    expect(newLineData).toEqual([ [ 2, 2 ] ]);

    canvasData = [
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'o' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
    ];

    newLineData = fillApi({
      c: 'A',
      x: 4,
      y: 1,
    } as ICommandDataFill, canvasData);
    expect(newLineData).toEqual(      [
      [ 4, 1 ], [ 4, 2 ],
      [ 4, 3 ], [ 4, 4 ],
      [ 3, 4 ], [ 2, 4 ],
      [ 1, 4 ],
    ]);
  });

  it('test2', () => {
    //   step1              step2              step3
    //   -------            -------            -------
    //   |  x  |            |  xkk|            |ooxkk|
    //   |  xxx|    ===>    |  xxx|    ===>    |ooxxx|
    //   |x x  |            |xox  |            |xox  |
    //   |x xxx|            |x xxx|            |xoxxx|
    //   |  x  |            |  x  |            |oox  |
    //   -------            -------            -------
    let canvasData =  [
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
    ];
    let newLineData = fillApi({
      c: 'k',
      x: 4,
      y: 1,
    } as ICommandDataFill, canvasData);

    expect(newLineData).toEqual([ [4, 1], [5, 1] ]);

    canvasData = [
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: 'k' },
        { draw: 'k' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: 'x' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
    ];

    newLineData = fillApi({
      c: 'o',
      x: 2,
      y: 3,
    } as ICommandDataFill, canvasData);

    expect(newLineData).toEqual([
      [ 2, 3 ], [ 2, 2 ],
      [ 2, 1 ], [ 1, 1 ],
      [ 1, 2 ], [ 2, 4 ],
      [ 2, 5 ], [ 1, 5 ],
    ]);
  });

  it('test3 # no canvas data', () => {
    const newLineData = fillApi({
      c: 'k',
      x: 4,
      y: 1,
    } as ICommandDataFill, []);

    expect(newLineData).toEqual([]);
  });

  it('test4 # no fill data', () => {
    const canvasData =  [
      [
        { draw: '-' },
        { draw: '-' },
        { draw: '-' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: 'x' },
      ],
    ];
    const newLineData = fillApi({
      c: 'o',
      x: 0,
      y: 0,
    } as ICommandDataFill, canvasData);

    expect(newLineData).toEqual([]);
  });
});
