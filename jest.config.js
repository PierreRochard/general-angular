const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./src/tsconfig.json');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/?(*.)+(spec).ts'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/', '/src/app/'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/'
    }),
    '\\.(css|scss)$': '<rootDir>/node_modules/jest-preset-angular/build/stylesheet-mock.js',
    '^app/(.*)$': '<rootDir>/src/app/$1',
  },
  transform: {
    '^.+\\.(ts|mjs|html|js)$': ['ts-jest', { tsconfig: '<rootDir>/src/tsconfig.spec.json' }]
  }
};
