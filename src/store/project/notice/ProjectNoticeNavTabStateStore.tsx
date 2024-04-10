import {atom} from "recoil";
import {SelectItem} from "@/utils/type";
import {ProjectNoticeMenuName, ProjectNoticeMenuValue} from "@/app/project/@notice/_utils/type";

export const projectNoticeActiveMenuStateStore = atom<SelectItem<ProjectNoticeMenuName, ProjectNoticeMenuValue>>({
    key:'projectNoticeActiveMenuState',
    default:{
        name:'전체',
        value: 'ALL'
    }
});
