import inquirer, {Answers} from 'inquirer';
import {commandQuestions} from './config';
import {validateCommand} from './validate';
import {handleCommand} from './handleCommand';

async function start() {
  const answers: Answers = await inquirer.prompt(commandQuestions);
  const commmandData = validateCommand(answers.command);
  handleCommand(commmandData);
  start();
}

start();
