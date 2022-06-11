

import { Answers, Question } from 'inquirer';

const commandQuestion: Question<Answers> = {
  message: 'enter command:',
  name: 'command',
  type: 'input',
};
export const commandQuestions: Question[] = [
  commandQuestion,
];

export enum COMMAND_ENUM {
  INCORRECT_COMMAND = 'INCORRECT_COMMAND',
  NEW_CANVAS = 'NEW_CANVAS',
  NEW_LINE = 'NEW_LINE',
  NEW_RECTANGLE = 'NEW_RECTANGLE',
  FILL = 'FILL',
  QUIT = 'QUIT',
}

export enum ERROR_MSG {
  NO_CANVAS = 'Please create a canvas first',
}

export enum DrawValue {
  X_BORDER_VALUE = '-',
  Y_BORDER_VALUE = '|',
  INIT_DRAW_VALUE = ' ',
  DEFAULT_DRAW_VALUE = 'x',
}
