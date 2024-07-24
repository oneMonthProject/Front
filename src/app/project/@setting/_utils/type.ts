import {TRUST_GRADE} from "@/app/project/@setting/_utils/constant";
import {ArrayValue, ProjectTaskAuth} from "@/utils/type";

export type TrustGradeSelectType = ArrayValue<typeof TRUST_GRADE.values>;
export type TrustGradeNameType = TrustGradeSelectType['name'];
export type TrustGradeValueType = TrustGradeSelectType['value'];

export type ProjectSettingForm = {
    projectId: bigint;
    projectName: string;
    subject: string;
    startDate: string;
    endDate: string;
}

export type ProjectSettingFormKey = keyof ProjectSettingForm;
export type ProjectSettingFormValue = ProjectSettingForm[ProjectSettingFormKey];

export type ProjectInfoUpdateReq = ProjectSettingForm & {
    authMap: ProjectTaskAuth;
}