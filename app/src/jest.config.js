// jest.config.js
module.exports = {
    // Other Jest configuration options
    moduleNameMapper: {
      '^axios$': '<rootDir>/__mocks__/axios.js',
    },
    moduleDirectories: ['node_modules', 'src'],
  };
  