import {handlers} from './handlers/index';
import {setupServer} from "msw/node";

export const mswServer = setupServer(...handlers);
