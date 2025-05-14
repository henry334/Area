module.exports = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testRegex: 'tests/.*\\.spec\\.ts$',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
