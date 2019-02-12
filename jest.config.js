module.exports = {
  preset: 'jest-expo',
  setupTestFrameworkScriptFile: '<rootDir>/tests/setupTests.js',
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.config.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/vendor/**',
    '!**/assets/**',
    '!**/tests/**',
    '!**/**/styles.js',
    // '!**/screens/AuthLoadingScreen/**',
  ],
};
