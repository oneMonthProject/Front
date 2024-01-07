import {atom, selector} from "recoil";
import {NoticeNavTabItem, NoticeTypeKey, NoticeTypeValue} from "@/utils/type";
import {NOTICE_TYPE} from "@/utils/constant";


class ProjectNoticeNavTabItem implements NoticeNavTabItem {
    current: boolean;
    type: NoticeTypeKey | 'ALL';
    type_kor: NoticeTypeValue | '전체';


    constructor(current: boolean, type :NoticeTypeKey | 'ALL') {
        this.current = current;
        this.type = type;
        this.type_kor = type === 'ALL' ? '전체' : NOTICE_TYPE[type];
    }
}

export const projectNoticeNavTabStateStore = atom<NoticeNavTabItem[]>({
    key: 'projectNoticeNavTabState',
    default: [
        new ProjectNoticeNavTabItem(true,'ALL'),
        new ProjectNoticeNavTabItem(false, 'RECRUIT'),
        new ProjectNoticeNavTabItem(false, 'WORK'),
        new ProjectNoticeNavTabItem(false, 'CREW')
    ]
});

export const currentProjectNoticeNavTabSelector = selector<NoticeNavTabItem>({
    key:'currentProjectNoticeNavTabSelector',
    get:({get}) => {
        const navTabs = get(projectNoticeNavTabStateStore);
        return navTabs.find(v => v.current)!;
    }
});