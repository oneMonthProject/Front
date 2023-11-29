import {atom, selector} from "recoil";
import {NavTabItem, ProjectNavTabItem} from "@/utils/type";
import {projectStateStore} from "@/store/project/ProjectStateStore";

class ProjectNavItemImpl implements ProjectNavTabItem {
    href: string;
    name: string;

    constructor(href:string, name:string) {
        this.href = href;
        this.name = name;
    }

}

export const projectNavTabSelector = selector<NavTabItem[]>({
    key:'projectNavTabSelector',
    get:({get}) => {
        const {projectId} = get(projectStateStore);

        return [
                new ProjectNavItemImpl(`/project/${projectId}/task`, '업무'),
                new ProjectNavItemImpl(`/project/${projectId}/crews`, '크루'),
                new ProjectNavItemImpl(`/project/${projectId}/notice`, '알림'),
                new ProjectNavItemImpl(`/project/${projectId}/setting`, '프로젝트 설정')
            ];
    }
});

export const currentProjectNavTab = atom<string>({
    key:'currentProjectNavTab',
    default:''
})

