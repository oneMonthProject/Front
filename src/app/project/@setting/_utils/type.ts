import {TRUST_GRADE} from "@/app/project/@setting/_utils/constant";
import {ArrayValue, ProjectTaskAuth} from "@/utils/type";

export type TrustGradeSelectType = ArrayValue<typeof TRUST_GRADE.values>;
export type TrustGradeNameType = TrustGradeSelectType['name'];
export type TrustGradeValueType = TrustGradeSelectType['value'];

export type ProjectInfoForm = {
    projectId: bigint;
    projectName: string;
    subject: string;
    trustGradeId: TrustGradeValueType
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
    trustGradeId: TrustGradeValueType;
    startDate: string;
    endDate: string;
}