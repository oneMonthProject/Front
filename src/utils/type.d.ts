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
    mileStoneId: bigint;
    projectId: bigint;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    progressStatus: string;
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
    techStackId: string | bigint;
    techStackName: string;
}

export interface UserInfo {
    id: string | number | null;
    nickname: string;
    imageSrc?: string | null;
    position?: SelectItem;
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

export type ProjectHistoryStatus = "FORCED_WITHDRAWAL" | "WITHDRAWAL" | "PARTICIPATING" | "FINISH";

export interface UserProjectHistory {
    userProjectHistoryId: bigint;
    status: ProjectHistoryStatus;
    projectName: string;
    updateDate: string;
}

interface PostPosition {
    boardPositionId: bigint;
    position: PositionItem;
}

interface PostUserInfo {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
}

export interface PostInfo {
    boardId: bigint;
    boardTitle: string;
    boardPositions: PostPosition[];
    project: PostProjectInfo;
    positions: PositionItem[];
    boardPageView: number;
    user: PostUserInfo;
    createDate: string;
    updateDate: string;
}

export interface AuthRequestParam {
    accessToken: CookieValueTypes;
}

export interface ResponseBody<T> {
    result: string;
    message: string;
    data: T
}

interface Paged<T> {
    content: T,
    totalPages: number;
}

export interface PageResponseBody<T> {
    result: string;
    message: string;
    data: Paged<T>
}

export interface TrustGrade {
    name: string;
    score: int;
}

export interface User {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
}

export interface ProjectMember {
    projectMemberId: bigint;
    user: User;
    projectMemberAuth: ProjectMemberAuth;
    position: Position;
    lastWorkDate: string;

}

export interface ProjectMemberAuth {
    projectMemberAuthId: bigint;
    projectMemberAuthName: string;
    milestone_change_YN: boolean;
    work_change_YN: boolean;
}

export interface Position {
    positionId: bigint;
    name: string;
}

export interface Project {
    projectId: bigint;
    name: string;
    subject: string;
    trustGrade: TrustGrade;
    startDate: date;
    endDate: date;
    createDate: date;
    updateDate: date;
    authMap: {
        milestoneAuth: boolean;
        workAuth: boolean;
    }
}

export interface ProjectInfo extends Project {
    status: string;
    crewNumber: int;
}

export interface PostProjectInfo extends Project {
    technologyStacks: TechStackItem[];
}

export interface ProjectPost extends Project {
    status: string;
    crewNumber: int;
    members: ProjectMember[];
}

export type SnackbarType = "INFO" | "ERROR" | "SUCCESS";

export interface SnackbarState {
    show: boolean;
    type: SnackbarType;
    content: string;
    duration?: number;
}