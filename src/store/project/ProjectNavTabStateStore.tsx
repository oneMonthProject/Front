import {atom, selector} from "recoil";
import {ProjectNavTabItem} from "@/utils/type";

class ProjectNavItemImpl implements ProjectNavTabItem {
    current: boolean;
    href: string;
    name: string;

    constructor(current:boolean, href:string, name:string) {
        this.current = current;
        this.href = href;
        this.name = name;
    }

}

export const projectNavTabState = atom<ProjectNavTabItem[]>({
    key: "projectNavTabState",
    default: [
        new ProjectNavItemImpl(false,'/project/task', '업무'),
        new ProjectNavItemImpl(false,'/project/crews', '크루'),
        new ProjectNavItemImpl(false,'/project/notice', '알림'),
        new ProjectNavItemImpl(false,'/project/setting', '프로젝트 설정')
    ]
});

export const currentProjectNavTabSelector = selector<ProjectNavTabItem | null>({
    key:'currentProjectNavTabSelector',
    get:({get}) => {
        const navTabs = get(projectNavTabState);
        return navTabs.find(v => v.current) || null;
    }
})