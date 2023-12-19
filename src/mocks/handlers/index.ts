import {handlers as projectHandler} from './projectHandlers';
import {handlers as userHandler } from './userHandler';

export const handlers = [...projectHandler, ...userHandler];