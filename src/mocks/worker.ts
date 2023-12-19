import {handlers} from './handlers/index';
import {setupWorker} from "msw";

export const mswWorker = setupWorker(...handlers);