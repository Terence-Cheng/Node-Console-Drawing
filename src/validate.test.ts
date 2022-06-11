import {
  validateCommand, isQuit, isNewCanvas, isNewLine,
  isNewRectangle, isFill, loopValidators,
} from './validate';
import { COMMAND_ENUM } from './config';


describe('validateCommand', () => {
  it('invalid # empty', () => {
    const commandData = validateCommand('');
    expect(commandData).toEqual({
      command: COMMAND_ENUM.INCORRECT_COMMAND,
    });
  });
  it('invalid # string', () => {
    const commandData = validateCommand('aaa');
    expect(commandData).toEqual({
      command: COMMAND_ENUM.INCORRECT_COMMAND,
    });
  });
  it('valid # create canvas', () => {
    const commandData = validateCommand('C 20 4');
    expect(commandData).toEqual({
      "command": "NEW_CANVAS",
      "h": 4,
      "w": 20,
    });
  });

  it('valid # create a line', () => {
    const commandData = validateCommand('L 20 4 20 1');
    expect(commandData).toEqual({
      "command": "NEW_LINE",
      "x1": 20,
      "x2": 20,
      "y1": 4,
      "y2": 1,
    });
  });

  it('valid # create a rectangle', () => {
    const commandData = validateCommand('R 20 4 50 1');
    expect(commandData).toEqual({
      "command": "NEW_RECTANGLE",
      "x1": 20,
      "x2": 50,
      "y1": 4,
      "y2": 1,
    });
  });

  it('valid # create a fill', () => {
    const commandData = validateCommand('B 1 2 o');
    expect(commandData).toEqual({
      "c": "o",
      "command": "FILL",
      "x": 1,
      "y": 2,
    });
  });

  it('valid # quit', () => {
    const commandData = validateCommand('Q');
    expect(commandData).toEqual({
      "command": "QUIT",
    });
  });
});

describe('isQuit', () => {
  it('valid', () => {
    const commandData = isQuit('Q');
    expect(commandData).toEqual([true, { "command": "QUIT" }]);
  });
  it('inValid # q', () => {
    const commandData = isQuit('q');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # after extra space', () => {
    const commandData = isQuit('Q ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # before extra space', () => {
    const commandData = isQuit(' Q');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # both extra space', () => {
    const commandData = isQuit(' Q ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # other string', () => {
    const commandData = isQuit('aaa');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # empty', () => {
    const commandData = isQuit('');
    expect(commandData[0]).toEqual(false);
  });
});

describe('isNewCanvas', () => {
  it('valid', () => {
    const commandData = isNewCanvas('C 20 4');
    expect(commandData).toEqual([true, {
      "command": "NEW_CANVAS",
      "h": 4,
      "w": 20,
    }]);
  });
  it('inValid # lower case', () => {
    const commandData = isNewCanvas('c 20 4 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # after extra space', () => {
    const commandData = isNewCanvas('C 20 4 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # before extra space', () => {
    const commandData = isNewCanvas(' C 20 4');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # both extra space', () => {
    const commandData = isNewCanvas(' C 20 4 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # other string', () => {
    const commandData = isNewCanvas('aaa');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # empty', () => {
    const commandData = isNewCanvas('');
    expect(commandData[0]).toEqual(false);
  });
});

describe('isNewLine', () => {
  it('valid', () => {
    const commandData = isNewLine('L 20 4 20 1');
    expect(commandData).toEqual([true, {
      "command": "NEW_LINE",
      "x1": 20,
      "x2": 20,
      "y1": 4,
      "y2": 1,
    }]);
  });
  it('inValid # lower case', () => {
    const commandData = isNewLine('l 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # after extra space', () => {
    const commandData = isNewLine('L 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # before extra space', () => {
    const commandData = isNewLine(' L 20 4 20 1');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # both extra space', () => {
    const commandData = isNewLine(' L 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # other string', () => {
    const commandData = isNewLine('aaa');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # empty', () => {
    const commandData = isNewLine('');
    expect(commandData[0]).toEqual(false);
  });
});

describe('isNewRectangle', () => {
  it('valid', () => {
    const commandData = isNewRectangle('R 20 4 20 1');
    expect(commandData).toEqual([true, {
      "command": "NEW_RECTANGLE",
      "x1": 20,
      "x2": 20,
      "y1": 4,
      "y2": 1,
    }]);
  });
  it('inValid # lower case', () => {
    const commandData = isNewRectangle('r 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # after extra space', () => {
    const commandData = isNewRectangle('R 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # before extra space', () => {
    const commandData = isNewRectangle(' R 20 4 20 1');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # both extra space', () => {
    const commandData = isNewRectangle(' R 20 4 20 1 ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # other string', () => {
    const commandData = isNewRectangle('aaa');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # empty', () => {
    const commandData = isNewRectangle('');
    expect(commandData[0]).toEqual(false);
  });
});

describe('isFill', () => {
  it('valid', () => {
    const commandData = isFill('B 20 1 z');
    expect(commandData).toEqual([true, {
      "c": "z",
      "command": "FILL",
      "x": 20,
      "y": 1,
    }]);
  });

  it('valid # upper case color', () => {
    const commandData = isFill('B 20 1 Z');
    expect(commandData).toEqual([true, {
      "c": "Z",
      "command": "FILL",
      "x": 20,
      "y": 1,
    }]);
  });

  it('inValid # lower case b', () => {
    const commandData = isFill('b 20 1 z ');
    expect(commandData[0]).toEqual(false);
  });

  it('inValid # after extra space', () => {
    const commandData = isFill('B 20 1 z ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # before extra space', () => {
    const commandData = isFill(' B 20 1 Z');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # both extra space', () => {
    const commandData = isFill(' B 20 1 z ');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # other string', () => {
    const commandData = isFill('aaa');
    expect(commandData[0]).toEqual(false);
  });
  it('inValid # empty', () => {
    const commandData = isFill('');
    expect(commandData[0]).toEqual(false);
  });
});

describe('loopValidators', () => {
  it('invalid # empty', () => {
    const commandData = loopValidators('');
    expect(commandData).toEqual([false]);
  });
  it('invalid # string', () => {
    const commandData = loopValidators('aaa');
    expect(commandData).toEqual([false]);
  });
  it('valid # create canvas', () => {
    const commandData = loopValidators('C 20 4');
    expect(commandData).toEqual([true, {
      "command": "NEW_CANVAS",
      "h": 4,
      "w": 20,
    }]);
  });

  it('valid # create a line', () => {
    const commandData = loopValidators('L 20 4 20 1');
    expect(commandData).toEqual([true, {
      "command": "NEW_LINE",
      "x1": 20,
      "x2": 20,
      "y1": 4,
      "y2": 1,
    }]);
  });

  it('valid # create a rectangle', () => {
    const commandData = loopValidators('R 20 4 50 1');
    expect(commandData).toEqual([true, {
      "command": "NEW_RECTANGLE",
      "x1": 20,
      "x2": 50,
      "y1": 4,
      "y2": 1,
    }]);
  });

  it('valid # create a fill', () => {
    const commandData = loopValidators('B 1 2 o');
    expect(commandData).toEqual([true, {
      "c": "o",
      "command": "FILL",
      "x": 1,
      "y": 2,
    }]);
  });

  it('valid # quit', () => {
    const commandData = loopValidators('Q');
    expect(commandData).toEqual([true, {
      "command": "QUIT",
    }]);
  });
});
