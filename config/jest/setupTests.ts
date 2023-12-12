import '@testing-library/jest-dom/extend-expect'
import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from 'vitest'
import {mswServer} from "@/mocks/server";

// Establish API mocking before all tests
// change
beforeAll(() => mswServer.listen())

// Reset any request handlers that we may add during the tests
// so they don't affet other tests
afterEach(() => {
    mswServer.resetHandlers()
})

// Clean up after the tests are finished
afterAll(() => mswServer.close())