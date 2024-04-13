import {TRUST_GRADE} from "@/app/project/@setting/_utils/constant";

export type TrustGradeKey = keyof typeof TRUST_GRADE;
export type TrustGradeNameType = (typeof TRUST_GRADE)[TrustGradeKey]["name"];
export type TrustGradeValueType = (typeof TRUST_GRADE)[TrustGradeKey]["value"];
export type TrustGradeIdType = (typeof TRUST_GRADE)[TrustGradeKey]["id"];

export type ProjectInfoForm = {
    name: string;
    subject: string;
    resTrustGrade: TrustGradeNameType;
    trustGradeId: TrustGradeIdType
    startDate: string;
    endDate: string;
}

export type ProjectInfoFormKey = keyof ProjectInfoForm;
export type ProjectInfoFormValue = ProjectInfoForm[ProjectInfoFormKey];

export type ProjectInfoUpdateReq = {
    projectId: bigint;
    projectName: string;
    subject: string;
    trustGradeId: bigint;
    startDate: string;
    endDate: string;
}