import {COMMAND_ENUM} from './config';


type ValidatorType<T=ICommandData> = (command: string) => [boolean, T?];

export const isQuit: ValidatorType = (command) => {
  const match = command.match(/^Q$/);
  return [Boolean(match), {command: COMMAND_ENUM.QUIT}];
};

export const isNewCanvas: ValidatorType<ICommandDataCanvas> = (command) => {
  const match = command.match(/^C (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 3;
  if (isMatched) {
    return [true, {
      command: COMMAND_ENUM.NEW_CANVAS,
      w: Number(match[1]),
      h: Number(match[2]),
    }];

  }
  return [false];
};

export const isNewLine: ValidatorType<ICommandDataLine> = (command) => {
  const match = command.match(/^L (\d+?) (\d+?) (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 5;
  if (isMatched) {
    return [
      true, {
        command: COMMAND_ENUM.NEW_LINE,
        x1: Number(match[1]),
        y1: Number(match[2]),
        x2: Number(match[3]),
        y2: Number(match[4]),
      },
    ];

  }
  return [false];
};

export const isNewRectangle: ValidatorType<ICommandDataRectangle> = (command) => {
  const match = command.match(/^R (\d+?) (\d+?) (\d+?) (\d+?)$/);
  const isMatched = match && match.length === 5;
  if (isMatched) {
    return [
      true, {
        command: COMMAND_ENUM.NEW_RECTANGLE,
        x1: Number(match[1]),
        y1: Number(match[2]),
        x2: Number(match[3]),
        y2: Number(match[4]),
      },
    ];

  }
  return [false];
};

export const isFill: ValidatorType<ICommandDataFill> = (command) => {
  const match = command.match(/^B (\d+?) (\d+?) ([a-zA-z])$/);
  const isMatched = match && match.length === 4;
  if (isMatched) {
    return [
      true, {
        command: COMMAND_ENUM.FILL,
        x: Number(match[1]),
        y: Number(match[2]),
        c: match[3],
      },
    ];

  }
  return [false];
};

export const loopValidators: ValidatorType = (command) => {
  const validators = [isQuit, isNewCanvas, isNewLine, isNewRectangle, isFill];

  for(let i = 0; i < validators.length; i++) {
    const [matched, data] = validators[i](command);

    if(matched) {
      return [matched, data];
    }
  }
  return [false];
};


export const validateCommand = (command: string): ICommandData => {
  const [matched, data] = loopValidators(command);
  if(matched && data) {
    return data;
  }
  return {
    command: COMMAND_ENUM.INCORRECT_COMMAND,
  };
};
