import {atom} from "recoil";

interface ProjectUserAuth {
    milestoneAuth: boolean;
    workAuth: boolean;
}

export const projectUserAuthStateStore = atom<ProjectUserAuth | null>({
    key:'projectUserAuthState',
});