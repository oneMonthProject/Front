'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {ProjectInfoUpdateReq} from "@/app/project/@setting/_utils/type";
import {ResponseBody} from "@/utils/type";
import {updateProjectInfo as updateProjectInfoAPI} from "@/service/project/project";
import {useRecoilValueLoadable, useResetRecoilState, useSetRecoilState} from "recoil";
import {projectInfoState, projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {projectSettingFormState} from "@/store/project/setting/ProjectSettingFormStateStore";
import {snackbarState} from "@/store/CommonStateStore";

function ProjectSettingFormSaveButton({projectId}: { projectId: string }) {
    const setSnackbar = useSetRecoilState(snackbarState);

    const resetProjectInfo = useResetRecoilState(projectInfoState(projectId));

    const {state: projectSettingLoadingState, contents: projectSettingForm} = useRecoilValueLoadable(projectSettingFormState);
    const {state: authMapLoadingState, contents: authMap} = useRecoilValueLoadable(projectTaskAuthSelector(projectId));


    const updateProjectInfo = async () => {
        if (confirm("프로젝트 정보를 수정하시겠습니까?")) {
            const projectInfo: ProjectInfoUpdateReq = {
                ...projectSettingForm,
                authMap
            }

            let res: ResponseBody<unknown>;
            try {
                res = await updateProjectInfoAPI(projectInfo);

                if (res.result === 'success') {
                    setSnackbar({show: true, type: 'SUCCESS', content: '프로젝트 정보를 수정했습니다.'});
                    resetProjectInfo();
                } else {
                    setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
                }
            } catch (e: unknown) {
                setSnackbar({show: true, type: 'ERROR', content: (e as Error).message});
            }
        }
    }

    const isUpdating = projectSettingLoadingState === 'loading' || authMapLoadingState === 'loading';

    return (
        <Button size="md" onClickHandler={updateProjectInfo} disabled={isUpdating}
                className={`${isUpdating && '!bg-gray-400 !text-white'}`}>
            저장
        </Button>
    );
}

export default ProjectSettingFormSaveButton;