import { DrawCanvas } from './index';

describe('DrawCanvas', () => {
  it('Canvas should be not created if width or height is 0', () => {
    const drawCanvas = new DrawCanvas;

    const spyRender = jest.spyOn(drawCanvas, 'render');

    drawCanvas.createCanvas({
      w: 0,
      h: 5,
    } as ICommandDataCanvas);

    expect(drawCanvas.canvasData).toEqual([]);
    expect(spyRender).not.toHaveBeenCalled();

    drawCanvas.createCanvas({
      w: 5,
      h: 0,
    } as ICommandDataCanvas);

    expect(drawCanvas.canvasData).toEqual([]);
    expect(spyRender).not.toHaveBeenCalled();
  });

  it('Canvas size should be equal to (Width + 2) * (Height + 2)', () => {
    const drawCanvas = new DrawCanvas;

    const spyRender = jest.spyOn(drawCanvas, 'render');

    drawCanvas.createCanvas({
      w: 10,
      h: 5,
    } as ICommandDataCanvas);

    expect(drawCanvas.canvasData[0].length).toBe(10 + 2);
    expect(drawCanvas.canvasData.length).toBe(5 + 2);
    expect(spyRender).toHaveBeenCalled();
  });

  it('Canvas newLine should call updateCanvasData() and render()', () => {
    const drawCanvas = new DrawCanvas;

    const spyRender = jest.spyOn(drawCanvas, 'render');
    const spyUpdateCanvasData = jest.spyOn(drawCanvas, 'updateCanvasData');

    drawCanvas.newLine({
      x1: 10,
      x2: 5,
      y1: 8,
      y2: 8,
    } as ICommandDataLine);

    expect(spyRender).toHaveBeenCalled();
    expect(spyUpdateCanvasData).toHaveBeenCalled();
  });

  it('Canvas newRectangle should call updateCanvasData() and render()', () => {
    const drawCanvas = new DrawCanvas;

    const spyRender = jest.spyOn(drawCanvas, 'render');
    const spyUpdateCanvasData = jest.spyOn(drawCanvas, 'updateCanvasData');

    drawCanvas.newRectangle({
      x1: 10,
      x2: 5,
      y1: 8,
      y2: 8,
    } as ICommandDataRectangle);

    expect(spyRender).toHaveBeenCalled();
    expect(spyUpdateCanvasData).toHaveBeenCalled();
  });

  it('Canvas fill should call updateCanvasData() and render()', () => {
    const drawCanvas = new DrawCanvas;

    const spyRender = jest.spyOn(drawCanvas, 'render');
    const spyUpdateCanvasData = jest.spyOn(drawCanvas, 'updateCanvasData');

    drawCanvas.fill({
      x: 10,
      y: 5,
      c: 'a',
    } as ICommandDataFill);

    expect(spyRender).toHaveBeenCalled();
    expect(spyUpdateCanvasData).toHaveBeenCalled();
  });

  it('Canvas render should call console', () => {
    const drawCanvas = new DrawCanvas;

    const log = jest.spyOn(console, 'log');

    drawCanvas.createCanvas({
      w: 10,
      h: 5,
    } as ICommandDataCanvas);

    expect(log).toHaveBeenCalledTimes(5 + 2);
    expect(log).toHaveBeenNthCalledWith(1, '------------');
    expect(log).toHaveBeenNthCalledWith(2, '|          |');
    expect(log).toHaveBeenNthCalledWith(3, '|          |');
    expect(log).toHaveBeenNthCalledWith(4, '|          |');
    expect(log).toHaveBeenNthCalledWith(5, '|          |');
    expect(log).toHaveBeenNthCalledWith(6, '|          |');
    expect(log).toHaveBeenNthCalledWith(7, '------------');
    log.mockRestore();
  });

  it('Canvas updateCanvasData should have the correct process', () => {
    const drawCanvas = new DrawCanvas;

    drawCanvas.createCanvas({
      w: 5,
      h: 6,
    } as ICommandDataCanvas);

    drawCanvas.updateCanvasData([[ 1, 2 ], [ 3, 4 ]]);
    const result = [
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
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: 'x' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
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
        { draw: '|' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: ' ' },
        { draw: '|' },
      ],
      [
        { draw: '|' },
        { draw: ' ' },
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
        { draw: '-' },
      ],
    ];
    expect(drawCanvas.canvasData).toEqual(result);

    drawCanvas.updateCanvasData([[ 9, 10 ], [ 11, 12 ]]);
    expect(drawCanvas.canvasData).toEqual(result);
  });
});

describe(
  'Test DrawCanvas Behavior',
  () => {
    it(
      'test1',
      () => {
        //    step1             step2             step3
        //    ------            ------            ------
        //    |xxx |            |xxxA|            |xxxA|
        //    |x x |    ===>    |xox |    ===>    |xoxA|
        //    |xxx |            |xxx |            |xxxA|
        //    |    |            |    |            |AAAA|
        //    ------            ------            ------

        const log = jest.spyOn(console, 'log');

        const drawCanvas = new DrawCanvas;

        // @ step1
        drawCanvas.createCanvas({
          w: 4,
          h: 4,
        } as ICommandDataCanvas);

        expect(log).toHaveBeenCalledTimes(4 + 2);
        expect(log).toHaveBeenNthCalledWith(1, '------');
        expect(log).toHaveBeenNthCalledWith(2, '|    |');
        expect(log).toHaveBeenNthCalledWith(3, '|    |');
        expect(log).toHaveBeenNthCalledWith(4, '|    |');
        expect(log).toHaveBeenNthCalledWith(5, '|    |');
        expect(log).toHaveBeenNthCalledWith(6, '------');

        drawCanvas.newRectangle({
          x1: 1,
          y1: 1,
          x2: 3,
          y2: 3,
        } as ICommandDataRectangle);

        expect(log).toHaveBeenCalledTimes((4 + 2) * 2);
        expect(log).toHaveBeenNthCalledWith(7, '------');
        expect(log).toHaveBeenNthCalledWith(8, '|xxx |');
        expect(log).toHaveBeenNthCalledWith(9, '|x x |');
        expect(log).toHaveBeenNthCalledWith(10, '|xxx |');
        expect(log).toHaveBeenNthCalledWith(11, '|    |');
        expect(log).toHaveBeenNthCalledWith(12, '------');

        // @ step2
        drawCanvas.fill({
          c: 'o',
          x: 2,
          y: 2,
        } as ICommandDataFill);

        let result = [
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

        expect(drawCanvas.canvasData).toEqual(result);

        expect(log).toHaveBeenCalledTimes((4 + 2) * 3);
        expect(log).toHaveBeenNthCalledWith(13, '------');
        expect(log).toHaveBeenNthCalledWith(14, '|xxx |');
        expect(log).toHaveBeenNthCalledWith(15, '|xox |');
        expect(log).toHaveBeenNthCalledWith(16, '|xxx |');
        expect(log).toHaveBeenNthCalledWith(17, '|    |');
        expect(log).toHaveBeenNthCalledWith(18, '------');

        // @ step3
        drawCanvas.fill({
          c: 'A',
          x: 4,
          y: 1,
        } as ICommandDataFill);

        result = [
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
            { draw: 'A' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'x' },
            { draw: 'o' },
            { draw: 'x' },
            { draw: 'A' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: 'A' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'A' },
            { draw: 'A' },
            { draw: 'A' },
            { draw: 'A' },
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
        expect(drawCanvas.canvasData).toEqual(result);


        expect(log).toHaveBeenCalledTimes((4 + 2) * 4);
        expect(log).toHaveBeenNthCalledWith(19, '------');
        expect(log).toHaveBeenNthCalledWith(20, '|xxxA|');
        expect(log).toHaveBeenNthCalledWith(21, '|xoxA|');
        expect(log).toHaveBeenNthCalledWith(22, '|xxxA|');
        expect(log).toHaveBeenNthCalledWith(23, '|AAAA|');
        expect(log).toHaveBeenNthCalledWith(24, '------');

        log.mockRestore();
      });

    it(
      'test2',
      () => {
        //   step1              step2              step3
        //   -------            -------            -------
        //   |  x  |            |  xkk|            |ooxkk|
        //   |  xxx|    ===>    |  xxx|    ===>    |ooxxx|
        //   |x x  |            |x x  |            |xox  |
        //   |x xxx|            |x xxx|            |xoxxx|
        //   |  x  |            |  x  |            |oox  |
        //   -------            -------            -------
        const log = jest.spyOn(console, 'log');
        const drawCanvas = new DrawCanvas;

        // @ step 1
        drawCanvas.createCanvas({
          w: 5,
          h: 5,
        } as ICommandDataCanvas);

        expect(log).toHaveBeenCalledTimes(5 + 2);
        expect(log).toHaveBeenNthCalledWith(1, '-------');
        expect(log).toHaveBeenNthCalledWith(2, '|     |');
        expect(log).toHaveBeenNthCalledWith(3, '|     |');
        expect(log).toHaveBeenNthCalledWith(4, '|     |');
        expect(log).toHaveBeenNthCalledWith(5, '|     |');
        expect(log).toHaveBeenNthCalledWith(6, '|     |');
        expect(log).toHaveBeenNthCalledWith(7, '-------');

        drawCanvas.newRectangle({
          x1: 3,
          y1: 2,
          x2: 5,
          y2: 4,
        } as ICommandDataRectangle);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 2);
        expect(log).toHaveBeenNthCalledWith(8, '-------');
        expect(log).toHaveBeenNthCalledWith(9, '|     |');
        expect(log).toHaveBeenNthCalledWith(10, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(11, '|  x x|');
        expect(log).toHaveBeenNthCalledWith(12, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(13, '|     |');
        expect(log).toHaveBeenNthCalledWith(14, '-------');

        drawCanvas.newLine({
          x1: 3,
          y1: 1,
          x2: 3,
          y2: 1,
        } as ICommandDataLine);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 3);
        expect(log).toHaveBeenNthCalledWith(15, '-------');
        expect(log).toHaveBeenNthCalledWith(16, '|  x  |');
        expect(log).toHaveBeenNthCalledWith(17, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(18, '|  x x|');
        expect(log).toHaveBeenNthCalledWith(19, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(20, '|     |');
        expect(log).toHaveBeenNthCalledWith(21, '-------');

        drawCanvas.newLine({
          x1: 1,
          y1: 3,
          x2: 1,
          y2: 4,
        } as ICommandDataLine);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 4);
        expect(log).toHaveBeenNthCalledWith(22, '-------');
        expect(log).toHaveBeenNthCalledWith(23, '|  x  |');
        expect(log).toHaveBeenNthCalledWith(24, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(25, '|x x x|');
        expect(log).toHaveBeenNthCalledWith(26, '|x xxx|');
        expect(log).toHaveBeenNthCalledWith(27, '|     |');
        expect(log).toHaveBeenNthCalledWith(28, '-------');


        drawCanvas.newLine({
          x1: 3,
          y1: 5,
          x2: 3,
          y2: 5,
        } as ICommandDataLine);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 5);
        expect(log).toHaveBeenNthCalledWith(29, '-------');
        expect(log).toHaveBeenNthCalledWith(30, '|  x  |');
        expect(log).toHaveBeenNthCalledWith(31, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(32, '|x x x|');
        expect(log).toHaveBeenNthCalledWith(33, '|x xxx|');
        expect(log).toHaveBeenNthCalledWith(34, '|  x  |');
        expect(log).toHaveBeenNthCalledWith(35, '-------');

        // @ step 2
        drawCanvas.fill({
          c: 'k',
          x: 4,
          y: 1,
        } as ICommandDataFill);

        let result = [
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

        expect(drawCanvas.canvasData).toEqual(result);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 6);
        expect(log).toHaveBeenNthCalledWith(36, '-------');
        expect(log).toHaveBeenNthCalledWith(37, '|  xkk|');
        expect(log).toHaveBeenNthCalledWith(38, '|  xxx|');
        expect(log).toHaveBeenNthCalledWith(39, '|x x x|');
        expect(log).toHaveBeenNthCalledWith(40, '|x xxx|');
        expect(log).toHaveBeenNthCalledWith(41, '|  x  |');
        expect(log).toHaveBeenNthCalledWith(42, '-------');

        // @ step 3
        drawCanvas.fill({
          c: 'o',
          x: 2,
          y: 3,
        } as ICommandDataFill);

        result = [
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
            { draw: 'o' },
            { draw: 'o' },
            { draw: 'x' },
            { draw: 'k' },
            { draw: 'k' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'o' },
            { draw: 'o' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'x' },
            { draw: 'o' },
            { draw: 'x' },
            { draw: ' ' },
            { draw: 'x' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'x' },
            { draw: 'o' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: 'x' },
            { draw: '|' },
          ],
          [
            { draw: '|' },
            { draw: 'o' },
            { draw: 'o' },
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

        expect(drawCanvas.canvasData).toEqual(result);

        expect(log).toHaveBeenCalledTimes((5 + 2) * 7);
        expect(log).toHaveBeenNthCalledWith(43, '-------');
        expect(log).toHaveBeenNthCalledWith(44, '|ooxkk|');
        expect(log).toHaveBeenNthCalledWith(45, '|ooxxx|');
        expect(log).toHaveBeenNthCalledWith(46, '|xox x|');
        expect(log).toHaveBeenNthCalledWith(47, '|xoxxx|');
        expect(log).toHaveBeenNthCalledWith(48, '|oox  |');
        expect(log).toHaveBeenNthCalledWith(49, '-------');

        log.mockRestore();
      });
  }
);
