module.exports = {
  preset: 'ts-jest',
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)"
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/__tests__/utils.ts"
  ]
};