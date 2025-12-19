/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
};
