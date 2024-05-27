import {atom} from "recoil";
import {ProjectNoticeKey} from "@/app/project/@notice/_utils/type";

export const projectNoticeActiveMenuStateStore = atom<ProjectNoticeKey>({
    key:'projectNoticeActiveMenuState',
    default:'ALL'
});
