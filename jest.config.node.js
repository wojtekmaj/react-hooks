const jestConfig = require('./jest.config');

module.exports = {
  ...jestConfig,
  moduleNameMapper: {
    '^@testing-library/react-hooks$': require.resolve('@testing-library/react-hooks/server'),
  },
  testEnvironment: 'node',
};
