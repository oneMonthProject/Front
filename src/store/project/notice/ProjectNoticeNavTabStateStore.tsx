import {atom, selector} from "recoil";
import {NavTabItem} from "@/utils/type";


class ProjectNoticeNavTabItem implements NavTabItem {
    current: boolean;
    href: string;
    name: string;

    constructor(current: boolean, href: string, name: string) {
        this.current = current;
        this.href = href;
        this.name = name;
    }
}

export const projectNoticeNavTabStateStore = atom<NavTabItem[]>({
    key: 'projectNoticeNavTabState',
    default: [
        new ProjectNoticeNavTabItem(true, '/project/notice','전체'),
        new ProjectNoticeNavTabItem(false, '/project/notice/recruit','모집'),
        new ProjectNoticeNavTabItem(false, '/project/notice/task','업무'),
        new ProjectNoticeNavTabItem(false, '/project/notice/crew','크루')
    ]
});

export const currentProjectNoticeNavTabSelector = selector<NavTabItem>({
    key:'currentProjectNoticeNavTabSelector',
    get:({get}) => {
        const navTabs = get(projectNoticeNavTabStateStore);
        return navTabs.find(v => v.current)!;
    }
});