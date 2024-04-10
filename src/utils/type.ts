import {MilestoneStatusCode, MilestoneStatusName} from "@/store/project/task/MilestoneStateStore";
import {CREW_STATUS, POINT_TYPE, TRUST_GRADE} from "@/utils/constant";
import {ReactNode} from "react";

export type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

export interface DropDownProps {
    items: DropDownItems[];
}

export interface NoticeNavTabItem {
    type: NoticeTypeKey | 'ALL';
    type_kor: NoticeTypeValue | '전체';
    current: boolean;
}

export interface ProjectNavTabItem {
    name: string;
    href: string;
    current: boolean;
}

export interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

export type SelectItem<T extends ReactNode, V extends ReactNode> = {
    name: T;
    value: V;
}

export interface SelectProps<T extends ReactNode, V extends ReactNode> {
    items: SelectItem<T, V>[];
    value: SelectItem<T, V>;
    setValue: (item: SelectItem<T, V>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}


export type MultiSelectProps<T extends ReactNode, V extends ReactNode> = {
    items: SelectItem<T, V>[];
    values: SelectItem<T,V>[];
    setValues: (value: SelectItem<T,V>[]) => void;
    value?: SelectItem<T,V> | null;
    setValue?: (value: SelectItem<T,V>) => void;
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
    mileStoneId: DataId;
    projectId: DataId;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    progressStatus: MilestoneStatusName | '';
    progressStatusCode?: MilestoneStatusCode | '';
    index?: number;
}

export type TaskStatusName = '시작전' | '진행중' | '완료' | '만료';
export type TaskStatusCode = 'PS001' | 'PS002' | 'PS003' | 'PS004';

export type AssignedUser = {
    projectMemberId: DataId;
    nickname: string;
}

export interface TaskItem {
    workId: DataId;
    projectId: DataId;
    milestoneId: DataId;
    assignedUser: AssignedUser | null;
    lastModifiedMemberNickname: string;
    content: string;
    startDate: string;
    endDate: string;
    progressStatus: TaskStatusName | '';
    contentDetail: string | '';
}

export type TrustGradeItem = {
    trustGradeId: DataId;
    trustGradeName: string;
}

export interface PositionItem {
    positionId: bigint;
    positionName: string;
}

export interface TechStackCategory {
    techStackCategoryId: bigint;
    techStackCategoryName: string;
}

export interface TechStackItem {
    techStackId: bigint;
    techStackName: string;
}

export interface TechStackWithCategory extends TechStackItem {
    categories: string[];
}

export interface ProfileInfo {
    userId: DataId | null;
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
    userProjectHistoryId: DataId;
    projectId: DataId;
    status: ProjectHistoryStatus;
    projectName: string;
    updateDate: string;
}

export interface PostPosition {
    boardPositionId: DataId;
    position: Position;
}

export interface PostUserInfo {
    email: string;
    nickname: string;
    profileImgSrc: string | null;
    trustGrade: TrustGrade;
}

export interface PostCardInfo {
    boardId: DataId;
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
    data: T
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
    name: string;
    minimumScore: number;
    maximumScore: number;
}

export interface User {
    userId: DataId;
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
    projectMemberId: DataId;
    projectId: DataId;
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
    positionId: DataId;
    name: string;
}

export interface Project {
    projectId: DataId;
    name: string;
    subject: string;
    trustGrade: TrustGrade;
    startDate: Date;
    endDate: Date;
    createDate: Date;
    updateDate: Date;
    status: string;
    crewNumber: int;
    authMap: {
        milestoneAuth: boolean;
        workAuth: boolean;
    }
}

export interface ProjectInfo extends Project {
    technologyStacks: TechStackItem[];
    trustGradeId: bigint[];
    technologyIds: bigint[];
}

export interface ProjectPost extends Project {
    members: ProjectMember[];
}

export interface PostDetailUserInfo {
    userId: DataId;
    nickName: string;
    userProfileImgSrc: string;
}

export interface PostDetailPosition {
    boardPositionId: DataId;
    position: Position;
}

export interface PostInfo {
    boardId: DataId;
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
    projectId: DataId;
    checkUserId?: DataId | null;
    sendUserId?: DataId | null;
    workId?: DataId | null;
    milestoneId?: DataId | null;
    positionId?: DataId | null;
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
    workId: DataId;
    trustScoreHistoryId: DataId;
    workContent: string;
    startDate: string;
    endDate: string;
    progressStatus: CrewStatusKeys;
    point: number | null;
    point_type: PointTypeKey | null;
}

export type PointTypeKey = keyof typeof POINT_TYPE;
export type PointTypeValue = typeof POINT_TYPE[PointTypeKey]

export interface UserBasicInfo {
    nickname: string;
    profileImgSrc: string;
}

export interface UserProjectNotice {
    alertId: DataId;
    project: {
        projectId: DataId;
        projectName: string;
    };
    position: PositionItem;
    supportResult: boolean | null;
}

export type TrustGradeNameType = keyof typeof TRUST_GRADE;

export type TrustGradeValueType = typeof TRUST_GRADE[TrustGradeNameType];

export interface TaskContentDetailItem {
    id: string;
    data: string;
}

export type DataId = string | bigint;

