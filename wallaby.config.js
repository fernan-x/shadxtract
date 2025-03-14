module.exports = function (wallaby) {
  return {
    autoDetect: true,

    files: [
      'core/**/*.ts',
      'lib/**/*.ts',
      'infra/**/*.ts',
      'jest.setup.ts',
      'package.json',
      'tsconfig.json',
      'jest.config.ts',
      '!core/**/*.test.ts'
    ],

    tests: [
      'core/**/*.test.ts'
    ],
  };
};
