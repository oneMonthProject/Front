// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
    roots: ["<rootDir>/src", "<rootDir>/__tests__"],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    coveragePathIgnorePatterns: [],
    setupFilesAfterEnv: ["./jest.setup.ts"],
    testEnvironment: "jest-environment-jsdom",
    testRegex: "\\.test\\.(ts|tsx)$",
    modulePaths: ["<rootDir>/src"],
    transform: {
        "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },

    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
        "<rootDir>/.next/",
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
    },
    moduleFileExtensions: [
        // Place tsx and ts to beginning as suggestion from Jest team
        // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
        "tsx",
        "ts",
        "web.js",
        "js",
        "web.ts",
        "web.tsx",
        "json",
        "web.jsx",
        "jsx",
        "node",
    ],
    globals: { TextEncoder: TextEncoder, TextDecoder: TextDecoder, fetch, Headers, Request, Response, FormData, Blob, "ts-jest":{"tsconfig":"tsconfig.jest.json"} },
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)