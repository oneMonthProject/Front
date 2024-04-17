import {TrustGradeIdType} from "@/app/project/@setting/_utils/type";
import {PositionId, TechStackId} from "@/utils/type";
import {recruitmentEntries} from "@/app/register/_utils/constant";


export type CreatePost = {
    title: string;
    content: string;
    contact: string;
    positionIds: PositionId[];
}

export type CreatePostKey = keyof CreatePost;

type RecruitCount = typeof recruitmentEntries extends IterableIterator<infer T> ? T : never;

export type RecruitCountValue = RecruitCount['value'];
export type RecruitCountName = RecruitCount['name'];

export type CreateProject = {
    name: string;
    subject: string;
    trustGradeId: TrustGradeIdType;
    crewNumber: RecruitCountValue;
    startDate: string;
    endDate: string;
    technologyIds: TechStackId[];
}

export type CreateProjectKey = keyof CreateProject;

export type CreatePostForm = {
    board: CreatePost;
    project: CreateProject;
}

