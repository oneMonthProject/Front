import {MilestoneStatusCode, MilestoneStatusName} from "@/store/project/task/MilestoneStateStore";
import {CREW_STATUS} from "@/utils/constant";
import {PointTypeKey} from "@/app/project/@notice/_utils/type";
import {TrustGradeNameType, TrustGradeValueType} from "@/app/project/@setting/_utils/type";

export type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

export interface DropDownProps {
    items: DropDownItem[];
}

export interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

export type SelectItem<T, V> = {
    name: T;
    value: V;
}

export interface SelectProps<T, V> {
    items: readonly SelectItem<T, V>[];
    value: SelectItem<T, V>;
    setValue: (item: SelectItem<T, V>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}


export type MultiSelectProps<T, V> = {
    items: readonly SelectItem<T, V>[];
    values: readonly SelectItem<T, V>[];
    setValues: (value: readonly SelectItem<T, V>[]) => void;
    value?: SelectItem<T, V> | null;
    setValue?: (value: SelectItem<T, V>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

export interface ModalState {
    title: string;
    isOpen: boolean;
}

export interface ConfirmModalState extends ModalState {
    content: string | React.JSX.Element;
    onClickConfirmHandler: () => void;
}

export interface MilestoneInfo {
    mileStoneId: bigint;
    projectId: bigint | string;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    progressStatus: MilestoneStatusName | '';
    progressStatusCode?: MilestoneStatusCode | '';
    index?: number;
}

export interface TrustGradeItem {
    trustGradeId: TrustGradeValueType;
    trustGradeName: TrustGradeNameType;
}

export interface PositionItem {
    positionId: bigint;
    positionName: string;
}

export type PositionId = PositionItem['positionId'];
export type PositionName = PositionItem['positionName'];

export interface TechStackCategory {
    techStackCategoryId: bigint;
    techStackCategoryName: string;
}

export interface TechStackItem {
    techStackId: bigint;
    techStackName: string;
}

export type TechStackValueType = TechStackItem['techStackId'];
export type TechStackNameType = TechStackItem['techStackName'];

export interface TechStackWithCategory extends TechStackItem {
    categories: string[];
}

export interface ProfileInfo {
    userId: bigint | null;
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
    projectId: bigint;
    status: ProjectHistoryStatus;
    projectName: string;
    updateDate: string;
}

interface PostPosition {
    boardPositionId: bigint;
    position: Position;
}

export interface PostUserInfo {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
}

export interface PostCardInfo {
    boardId: bigint;
    boardTitle: string;
    boardPositions: PostPosition[];
    project: ProjectInfo;
    positions: PositionItem[];
    boardPageView: number;
    user: PostUserInfo;
    createDate: string;
    updateDate: string;
}

export type ResponseBody<T> = {
    result: string;
    message: string;
    data: T | null
}

export type Paged<T> = {
    content: T,
    totalPages: number;
}

export type PageResponseBody<T> = {
    result: string;
    message: string;
    data: Paged<T>
}

export interface TrustGrade {
    name: TrustGradeNameType;
    minimumScore: number;
    maximumScore: number;
}

export interface User {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
}

export interface ProjectUser extends User {
    position: Position;
    trustGrade: TrustGrade;
    trustScore: number;
    role: string;
    createDate: string;
    updateDate: string;
}

export interface ProjectMemberProfile {
    projectMemberId: bigint;
    projectId: bigint;
    projectCount: number;
    user: ProjectUser;
    projectMemberAuth: ProjectMemberAuth;
    position: Position;
    status: CrewStatusKeys;
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
    startDate: string;
    endDate: string;
    createDate: string;
    updateDate: string;
    status: string;
    crewNumber: number;
    authMap: ProjectTaskAuth
}

export type ProjectTaskAuth = {
    milestoneAuth: boolean;
    workAuth: boolean;
}

export interface ProjectInfo extends Project {
    technologyStacks: TechStackItem[];
    trustGradeId: TrustGradeValueType[];
    technologyIds: bigint[];
}

export interface ProjectPost extends Project {
    members: ProjectMember[];
}

export interface PostDetailUserInfo {
    userId: bigint;
    nickName: string;
    userProfileImgSrc: string;
}

export interface PostDetailPosition {
    boardPositionId: bigint;
    position: Position;
}

export interface PostInfo {
    boardId: bigint;
    title: string;
    content: string;
    pageView: number;
    recruitmentStatus: boolean;
    user: PostDetailUserInfo;
    contact: string;
    createDate: string;
    updateDate: string;
    boardPositions: PostDetailPosition[];
}

export interface PostDetailInfo {
    board: PostInfo,
    project: ProjectInfo
}

export type SnackbarType = "INFO" | "ERROR" | "SUCCESS";

export interface SnackbarState {
    show: boolean;
    type: SnackbarType;
    content: string;
    duration?: number;
}


export interface NoticeCreateForm {
    projectId: bigint;
    checkUserId?: bigint | null;
    sendUserId?: bigint | null;
    workId?: bigint | null;
    milestoneId?: bigint | null;
    positionId?: bigint | null;
    type: string;
    content: string;
}

/**
 * CREW_STATUS enum의 키값 타입
 */
export type CrewStatusKeys = keyof typeof CREW_STATUS;

/**
 * 프로젝트 크루 업무 이력
 */
export interface CrewTaskHistory {
    workId: bigint;
    trustScoreHistoryId: bigint;
    workContent: string;
    createDate: string;
    progressStatus: CrewStatusKeys;
    point: number | null;
    point_type: PointTypeKey | null;
}

export interface UserBasicInfo {
    nickname: string;
    profileImgSrc: string;
}

export interface UserProjectNotice {
    alertId: bigint;
    project: {
        projectId: bigint;
        projectName: string;
    };
    position: PositionItem;
    supportResult: boolean | null;
}

export type DataId = string | bigint;

export type ArrayValue<T> = T extends () => IterableIterator<infer U> ? U : never;