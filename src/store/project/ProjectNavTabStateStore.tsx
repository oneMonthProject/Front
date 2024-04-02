import {atom} from "recoil";
import {ProjectMenu} from "@/utils/constant";

export const projectActiveNavState = atom<ProjectMenu>({
    key:'projectActiveNavState',
    default: ProjectMenu.TASK
});