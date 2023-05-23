// jest.config.js
import { Config } from "jest"
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  roots: ['<rootDir>', '<rootDir>/pages/', '<rootDir>/components/'],
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['<rootDir>', '/pages/**/*', '/components/**/*'],
  moduleDirectories: ['node_modules','/pages/**/*', '/components/**/*'],
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    "react-markdown": "<rootDir>/node_modules/react-markdown/react-markdown.min.js"
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)