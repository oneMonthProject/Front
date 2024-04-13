'use client';
import React from "react";
import Button from "@/components/ui/Button";
import {numStrToBigInt, throwErrorIfInvalid} from "@/utils/common";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {endProject as endProjectAPI, updateProjectInfo as updateProjectInfoAPI} from "@/service/project/project";
import {useRouter} from "next/navigation";
import {ProjectInfoUpdateReq} from "@/app/project/@setting/_utils/type";
import {projectSettingFormState} from "@/store/project/setting/ProjectSettingFormStateStore";
import ProjectDate from "@/components/project/setting/ProjectDate";
import ProjectSubject from "@/components/project/setting/ProjectSubject";
import ProjectName from "@/components/project/setting/ProjectName";
import ProjectTrustGrade from "@/components/project/setting/ProjectTrustGrade";
import {projectIdState, projectInfoState, projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";


export default function ProjectSettingForm() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const projectId = useRecoilValue(projectIdState);
    const {milestoneAuth} = useRecoilValue(projectTaskAuthSelector)!;
    const formData = useRecoilValue(projectSettingFormState);
    const revertForm = useResetRecoilState(projectSettingFormState);
    const invalidateProjectInfo = useResetRecoilState(projectInfoState);


    // 프로젝트 업데이트
    const updateProjectInfo = async () => {
        if (confirm("프로젝트 정보를 수정하시겠습니까?")) {

            if (!milestoneAuth) {
                setSnackbar({show: true, type: 'INFO', content: '프로젝트 수정 권한이 없습니다.'});
                return;
            }

            const {name: projectName, subject, trustGradeId, startDate, endDate} = formData!;
            try {
                throwErrorIfInvalid(!projectName, '프로젝트 이름을 입력해주세요');
                throwErrorIfInvalid(!subject, '프로젝트 주제를 입력해주세요');
                throwErrorIfInvalid(!trustGradeId, '프로젝트 신뢰등급을 선택해주세요');
                throwErrorIfInvalid(!startDate, '시작날짜를 선택해주세요');
                throwErrorIfInvalid(!endDate, '종료날짜를 선택해주세요');
            } catch (e: unknown) {
                setSnackbar({show: true, type: 'ERROR', content: (e as Error).message});
            }

            const projectInfo: ProjectInfoUpdateReq = {
                projectId: numStrToBigInt(projectId),
                projectName,
                subject,
                trustGradeId: BigInt(trustGradeId!),
                startDate,
                endDate
            }

            const res = await updateProjectInfoAPI(projectInfo);

            if (res.result === 'success') {
                invalidateProjectInfo();
                setSnackbar({show: true, type: 'SUCCESS', content: '프로젝트 정보를 수정했습니다.'});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
            }
        }
    }

    /**
     * 프로젝트 종료
     */
    const router = useRouter();
    const endProject = async () => {
        if (confirm("프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된 모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요. \r\n\r\n 종료하시겠습니까?")) {
            const res = await endProjectAPI(projectId);
            if (res.result === 'success') {
                setSnackbar({show: true, type: 'SUCCESS', content: '프로젝트를 종료했습니다.'});
                router.push("/");
                router.refresh();
            } else if (res.result === 'fail') {
                setSnackbar({show: true, type: 'ERROR', content: res.message});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: "프로세스 수행중 에러가 발생했습니다."});
            }
        }
    }

    return (
        <div className="space-y-6 px-8 mobile:px-4">
            <div className="space-y-6">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보 설정</div>
                <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3 px-3 mobile:px-0">
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <ProjectName/>
                        <ProjectSubject/>
                        <ProjectTrustGrade/>
                    </div>
                    <ProjectDate/>
                </div>
                <div className="text-end space-x-2 px-3 mobile:px-0">
                    <Button
                        theme="primary-hollow"
                        size="md"
                        onClickHandler={() => revertForm()}
                    >
                        초기화
                    </Button>
                    <Button size="md" onClickHandler={updateProjectInfo}>저장</Button>
                </div>
            </div>
            <div className="space-y-3">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 상태 설정</div>
                <div className="flex mobile:flex-col px-3 mobile:px-0">
                    <div className="self-center mobile:text-sm">프로젝트 종료 후 다시 상태를 변경할 수 없습니다.</div>
                    <div className="ml-auto mobile:mt-2">
                        <Button theme='black' size='md' onClickHandler={endProject}>프로젝트 종료</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}