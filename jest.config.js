// eslint-disable-next-line
const path = require('path');

module.exports = {

  collectCoverageFrom: [
    "src/**/*.ts",
  ],

  // setupFiles: ['<rootDir>/__tests__/setup.ts'],

  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).ts'],

  testEnvironment: 'node',

  testURL: 'http://localhost:4444',

  transform: {

    '^.+\\.ts$': 'ts-jest',

  },

  transformIgnorePatterns: [

    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',

  ],

  moduleNameMapper: {},

  moduleFileExtensions: ['js', 'ts'],

  globals: {

    'ts-jest': {

      tsConfig: path.join(process.cwd(), 'tsconfig.test.json'),

    },

  },

};
