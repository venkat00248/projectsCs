module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  testTimeout: 10000,
};
