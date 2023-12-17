import {ReactNode} from "react";
import {CookieValueTypes} from "cookies-next";

export type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

export interface DropDownProps {
    items: DropDownItems[];
}

export interface NavTabItem {
    name: string;
    href: string;
    current: boolean;
}

export interface ProjectNavTabItem extends NavTabItem {
    name: string;
    href: string;
    current: boolean;
}

export interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

export type SelectItem = {
    value: string | number | bigint | null | undefined;
    name: string;
}

export interface SelectProps {
    items: SelectItem[];
}

export interface SingleSelectProps extends SelectProps {
    value: SelectItem | null;
    setValue: (value: SelectItem) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

export interface MultiSelectProps extends SingleSelectProps {
    values: SelectItem[];
    setValues: (value: SelectItem[]) => void;
    value?: SelectItem | null;
    setValue?: (value: SelectItem) => void;
}

export interface NoticeItemProp {
    alertId: string;
    createUserId: string;
    content: string;
    type: string;
    createDate: string;
    position?: string;
}

interface ModalState {
    title: string;
    isOpen: boolean;
}

export interface MilestoneInfo {
    milestone_id: string;
    milestone_content: string;
    start_date: string;
    end_date: string;
}

export interface TaskItem {
    workId: string;
    workContent: string;
    startDate: string;
    endDate: string;
    completeStatus: boolean;
    expiredStatus: boolean;
    updateDate: string;
    assignedUserId: string;
}

interface TrustGradeItem {
    trustGradeId: string | bigint;
    trustGradeName: string;
}

export interface PositionItem {
    positionId: string | bigint;
    positionName: string;
}

export interface TechStackItem {
    technologyStackId: string | bigint;
    technologyStackName: string;
}

export interface UserInfo {
    id: string | number | null;
    nickname: string;
    imageSrc?: string | null;
    position?: SelectItem;
    // 추가 예정
}

export interface ProfileInfo {
    userId: string | number | bigint | null;
    email: string;
    nickname: string;
    profileImgSrc?: string | null;
    trustScore: number;
    trustGrade: TrustGradeItem;
    position: PositionItem;
    techStacks: TechStackItem[];
    intro?: string;
    projectHistoryTotalCount: number;
    createDate: string;
    updateDate: string;
}

export interface UserProjectHistory {
    userProjectHistoryId: bigint;
    status: string;
    projectName: string;
    updateDate: string;
}

export interface PostInfo {
    id: string | number;
    title: string;
    projectName: string;
    projectSubject: string;
    trustGrade: string;
    recruitmentCount: number | string;
    startDate: Date;
    endDate: Date;
    positions: SelectItem[];
    techStacks: SelectItem[];
    contact: string;
    userInfo: UserInfo;
}

export interface AuthRequestParam {
    accessToken: CookieValueTypes;
}

export interface ReqProjectDetailParam extends AuthRequestParam {
    projectId: string;
}

export interface ResponseBody<T> {
    result: string;
    message: string;
    data: T
}

export interface TrustGrade {
    name: string;
    score: int;
}

export interface ProjectInfo {
    projectId: bigint;
    name: string;
    subject: string;
    trustGrade: TrustGrade;
    status: string;
    crewNumber: int;
    startDate: date;
    endDate: date;
    createDate: date;
    updateDate: date;
}