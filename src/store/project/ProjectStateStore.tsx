import {atom} from "recoil";

interface ProjectState {
    projectId:string;
}
export const projectStateStore = atom<ProjectState>({
    key:'projectStateStore',
    default:{
        projectId:''
    }
});