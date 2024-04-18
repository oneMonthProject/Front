import {TrustGradeValueType} from "@/app/project/@setting/_utils/type";
import {PositionId, ReadOnlyArrayValue, TechStackValueType} from "@/utils/type";
import {recruitmentCountList} from "@/app/register/_utils/constant";


export type CreatePost = {
    title: string;
    content: string;
    contact: string;
    positionIds: PositionId[];
}

export type CreatePostKey = keyof CreatePost;

type RecruitCount = ReadOnlyArrayValue<typeof recruitmentCountList>;
export type RecruitCountValue = RecruitCount['value'];
export type RecruitCountName = RecruitCount['name'];

export type CreateProject = {
    name: string;
    subject: string;
    trustGradeId: TrustGradeValueType;
    crewNumber: RecruitCountValue;
    startDate: string;
    endDate: string;
    technologyIds: TechStackValueType[];
}

export type CreateProjectKey = keyof CreateProject;

export type CreatePostForm = {
    board: CreatePost;
    project: CreateProject;
}

