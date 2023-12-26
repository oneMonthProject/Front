import {handlers as projectHandler} from './project/index';
import {handlers as userHandler } from './userHandler';
import {handlers as postHandlers } from './postHandlers';
import {handlers as commonHandlers } from './commonHandlers';

export const handlers = [...projectHandler, ...userHandler, ...postHandlers, ...commonHandlers];