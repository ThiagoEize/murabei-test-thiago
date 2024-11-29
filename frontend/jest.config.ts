import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }], // Use the Jest-specific TypeScript config
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Resolve the "@" alias to src directory
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Ensure proper setup for Jest environment
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore unnecessary paths
};

export default config;
