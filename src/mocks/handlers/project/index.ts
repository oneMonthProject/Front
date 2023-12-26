import {handlers as projectHandler} from '../project/projectHandlers';
import {handlers as milestoneHandlers} from '../project/projectMilestoneHandlers';

export const handlers = [...projectHandler, ...milestoneHandlers];