module.exports = {
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.js",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx}",
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    testEnvironment: "jsdom",
  };