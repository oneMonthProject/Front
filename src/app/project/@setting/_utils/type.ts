import {TRUST_GRADE} from "@/app/project/@setting/_utils/constant";
import {ProjectTaskAuth} from "@/utils/type";

export type TrustGradeKey = keyof typeof TRUST_GRADE;
export type TrustGradeNameType = (typeof TRUST_GRADE)[TrustGradeKey]["name"];
export type TrustGradeValueType = (typeof TRUST_GRADE)[TrustGradeKey]["value"];
export type TrustGradeIdType = (typeof TRUST_GRADE)[TrustGradeKey]["id"];

export type ProjectInfoForm = {
    projectId: bigint;
    projectName: string;
    subject: string;
    trustGradeId: TrustGradeIdType
    startDate: string;
    endDate: string;
}

export type ProjectInfoFormKey = keyof ProjectInfoForm;
export type ProjectInfoFormValue = ProjectInfoForm[ProjectInfoFormKey];

export type ProjectInfoUpdateReq = {
    authMap: ProjectTaskAuth;
    projectId: bigint;
    projectName: string;
    subject: string;
    trustGradeId: TrustGradeIdType;
    startDate: string;
    endDate: string;
}