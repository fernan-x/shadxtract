module.exports = function (wallaby) {
  return {
    files: [
      'core/**/*.ts',
      'core/**/*.tsx',
      'core/**/*.js',
      'core/**/*.jsx',
      '!core/**/*.test.ts',
      '!core/**/*.test.tsx',
      '!core/**/*.test.js',
      '!core/**/*.test.jsx'
    ],

    tests: [
      'core/**/*.test.ts',
      'core/**/**/*.test.ts',
      'core/**/*.test.tsx',
      'core/**/*.test.js',
      'core/**/*.test.jsx'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    setup: function (wallaby) {
      const jestConfig = require('./jest.config.ts');
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
