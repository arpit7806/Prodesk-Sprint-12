const nextJest = require("next/jest");

// nextJest points at the app root so it can load next.config.mjs + .env files
// automatically and use Next's own SWC compiler for transforms — no Babel config needed.
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // mirrors the "@/*" -> "./*" alias in your jsconfig.json
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

module.exports = createJestConfig(customJestConfig);