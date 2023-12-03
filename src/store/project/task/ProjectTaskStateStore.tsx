import { atom, selector } from "recoil";
import { UserInfo } from "@/utils/type";

interface ModalState {
  isOpen: boolean;
  title: string;
}

// Milestone
interface MilestoneState {
  type: "add" | "modify";
  id: string | number | null;
  content: string;
  startDate: Date | null;
  endDate: Date | null;
  updateUser: string;
  updateDate: Date | null;
}

export class MilestoneForm implements MilestoneState {
  type: "add" | "modify";
  id: string | number | null;
  content: string;
  startDate: Date | null;
  endDate: Date | null;
  updateUser: string;
  updateDate: Date | null;

  constructor(type: 'add' | 'modify', id: string | number | null, content: string, startDate: Date | null, endDate: Date | null, updateUser: string, updateDate: Date | null) {
    this.type = type;
    this.id = id;
    this.content = content;
    this.startDate = startDate;
    this.endDate = endDate;
    this.updateUser = updateUser;
    this.updateDate = updateDate;
  }
}

export const currentMilestoneFormState = atom<null | MilestoneState>({
  key: 'currentMilestoneFormState',
  default: null
});

export const milestoneModalStateSelector = selector<ModalState>({
  key: 'milestoneModalStateSelector',
  get: ({ get }) => {
    const state = get(currentMilestoneFormState);

    let title = '';
    if (state !== null) {
      switch (state?.type) {
        case 'add':
          title = '마일스톤 추가';
          break;
        case 'modify':
          title = '마일스톤 수정';
          break;
        default:
          throw Error('Unknown Project Notice Form Type');
      }
    }

    return { isOpen: state !== null, title: title };
  }
})

// Task
interface TaskState {
  type: "add" | "modify";
  id: string | number | null;
  content: string;
  isComplete: boolean;
  startDate: Date | null;
  endDate: Date | null;
  assignees: UserInfo[];
  updateUser: string;
  updateDate: Date | null;
}

export class TaskForm implements TaskState {
  type: "add" | "modify";
  id: string | number | null;
  content: string;
  isComplete: boolean;
  startDate: Date | null;
  endDate: Date | null;
  assignees: UserInfo[];
  updateUser: string;
  updateDate: Date | null;

  constructor(type: 'add' | 'modify', id: string | number | null, content: string, isComplete: boolean,
    startDate: Date | null, endDate: Date | null, assignees: UserInfo[], updateUser: string, updateDate: Date | null) {
    this.type = type;
    this.id = id;
    this.content = content;
    this.isComplete = isComplete;
    this.startDate = startDate;
    this.endDate = endDate;
    this.assignees = assignees;
    this.updateUser = updateUser;
    this.updateDate = updateDate;
  }
}

export const currentTaskFormState = atom<null | TaskState>({
  key: 'currentTaskFormState',
  default: null
});

export const taskModalStateSelector = selector<ModalState>({
  key: 'taskModalStateSelector',
  get: ({ get }) => {
    const state = get(currentTaskFormState);

    let title = '';
    if (state !== null) {
      switch (state?.type) {
        case 'add':
          title = '업무 추가';
          break;
        case 'modify':
          title = '업무 수정';
          break;
        default:
          throw Error('Unknown Project Notice Form Type');
      }
    }

    return { isOpen: state !== null, title: title };
  }
})