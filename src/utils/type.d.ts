import {CookieValueTypes} from "cookies-next";
import {MilestoneStatusCode, MilestoneStatusName} from "@/store/project/task/MilestoneStateStore";
import {CREW_STATUS, NOTICE_TYPE, POINT_TYPE, TRUST_GRADE, TRUST_GRADE_NAME} from "@/utils/constant";

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

export type SelectItem = {
    value: string | number | bigint | boolean | null | undefined;
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

interface ModalState {
    title: string;
    isOpen: boolean;
}

export interface ConfirmModalState extends ModalState {
    content: string | React.JSX.Element;
    onClickConfirmHandler: () => void;
}

export interface MilestoneInfo {
    mileStoneId: bigint;
    projectId: bigint;
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
    projectMemberId: bigint;
    nickname: string;
}

export interface TaskItem {
    workId: bigint;
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

interface TrustGradeItem {
    trustGradeId: string | bigint;
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
    projectId: bigint;
    status: ProjectHistoryStatus;
    projectName: string;
    updateDate: string;
}

interface PostPosition {
    boardPositionId: bigint;
    position: Position;
}

interface PostUserInfo {
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
    startDate: date;
    endDate: date;
    createDate: date;
    updateDate: date;
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

interface PostDetailUserInfo {
    userId: bigint;
    nickName: string;
    userProfileImgSrc: string;
}

interface PostDetailPosition {
    boardPositionId: bigint;
    position: Position;
}

interface PostInfo {
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

export type NoticeTypeKey = keyof typeof NOTICE_TYPE;

export type NoticeTypeValue = typeof NOTICE_TYPE[NoticeTypeKey];

export interface Notice {
    alertId: bigint;
    projectId: bigint;
    checkUserId: bigint;
    sendUserId: bigint;
    workId: bigint | null;
    milestoneId: bigint | null;
    position: Position | null;
    content: string;
    type: NoticeTypeKey;
    createDate: string;
    updateDate: string;
    checkedStatus: boolean;
}

export interface NoticeCreateForm {
    projectId: bigint | string;
    checkUserId?: bigint | string | null;
    sendUserId?: bigint | string | null;
    workId?: bigint | string | null;
    milestoneId?: bigint | string | null;
    positionId?: bigint | string | null;
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
    workId: bigint | string;
    trustScoreHistoryId: bigint | string;
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
    alertId: string | bigint;
    project: {
        projectId: string | bigint;
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