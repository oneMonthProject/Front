import {TRUST_GRADE} from "@/app/project/@setting/_utils/constant";
import {ProjectTaskAuth, ReadOnlyArrayValue} from "@/utils/type";

export type TrustGradeSelectType = ReadOnlyArrayValue<typeof TRUST_GRADE>;
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