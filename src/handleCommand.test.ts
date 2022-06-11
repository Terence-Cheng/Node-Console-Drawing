import { handleCommand } from './handleCommand';
import { COMMAND_ENUM, ERROR_MSG } from './config';
// import DrawCanvas from './canvas/index';

// jest.mock('./canvas/index'); // SoundPlayer is now a mock constructor

// const DrawCanvas = jest.mock('./canvas/index');

let mockCreateCanvas = jest.fn();
let mockNewLine = jest.fn();
let mockNewRegtangle = jest.fn();
let mockFill = jest.fn();

jest.mock('./canvas/index', () => {
  return {
    DrawCanvas: jest.fn().mockImplementation(() => {
      return {
        createCanvas: mockCreateCanvas,
        newLine: mockNewLine,
        newRectangle: mockNewRegtangle,
        fill: mockFill,
      };
    }),
  };
});


let log: jest.SpyInstance;

describe('handleCommand', () => {
  beforeEach(() => {
    log = jest.spyOn(console, 'log');
    mockCreateCanvas = jest.fn();
    mockNewLine = jest.fn();
    mockNewRegtangle = jest.fn();
    mockFill = jest.fn();
  });
  afterEach(() => {
    log.mockRestore();
  });
  it('incorrect_command', () => {
    handleCommand({
      command: COMMAND_ENUM.INCORRECT_COMMAND,
    } as ICommandData);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(COMMAND_ENUM.INCORRECT_COMMAND + '..!!');
  });

  it('QUIT', () => {
    const mockExit = jest.spyOn(process, 'exit')
      .mockImplementation(() => { throw new Error('process.exit: '); });

    expect(() => {
      handleCommand({
        command: COMMAND_ENUM.QUIT,
      } as ICommandData);
    }).toThrow();
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(COMMAND_ENUM.QUIT + '..!!');
    expect(mockExit).toHaveBeenCalledTimes(1);
    mockExit.mockRestore();

  });

  it('before create canvas when newline, new rectangle or fill', () => {
    handleCommand({
      command: COMMAND_ENUM.NEW_LINE,
    } as ICommandData);
    expect(mockNewLine).toHaveBeenCalledTimes(0);
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenNthCalledWith(1, ERROR_MSG.NO_CANVAS + '..!!');

    handleCommand({
      command: COMMAND_ENUM.NEW_RECTANGLE,
    } as ICommandData);
    expect(mockNewRegtangle).toHaveBeenCalledTimes(0);
    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenNthCalledWith(2, ERROR_MSG.NO_CANVAS + '..!!');

    handleCommand({
      command: COMMAND_ENUM.FILL,
    } as ICommandData);
    expect(mockFill).toHaveBeenCalledTimes(0);
    expect(log).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenNthCalledWith(3, ERROR_MSG.NO_CANVAS + '..!!');
  });

  it('after create canvas when newline, new rectangle or fill', () => {
    handleCommand({
      command: COMMAND_ENUM.NEW_CANVAS,
    } as ICommandData);
    expect(mockCreateCanvas).toHaveBeenCalledTimes(1);

    handleCommand({
      command: COMMAND_ENUM.NEW_LINE,
    } as ICommandData);
    expect(mockNewLine).toHaveBeenCalledTimes(1);

    handleCommand({
      command: COMMAND_ENUM.NEW_RECTANGLE,
    } as ICommandData);
    expect(mockNewRegtangle).toHaveBeenCalledTimes(1);

    handleCommand({
      command: COMMAND_ENUM.FILL,
    } as ICommandData);
    expect(mockFill).toHaveBeenCalledTimes(1);
  });
  it('new_canvas', () => {
    handleCommand({
      command: COMMAND_ENUM.NEW_CANVAS,
    } as ICommandData);
    expect(mockCreateCanvas).toHaveBeenCalledTimes(1);
  });
});
