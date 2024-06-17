'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {ProjectInfoUpdateReq, ProjectSettingForm} from "@/app/project/@setting/_utils/type";
import {ProjectTaskAuth, ResponseBody} from "@/utils/type";
import {updateProjectInfo as updateProjectInfoAPI} from "@/service/project/project";
import {useRecoilValueLoadable, useResetRecoilState} from "recoil";
import {projectInfoState, projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {projectSettingFormState} from "@/store/project/setting/ProjectSettingFormStateStore";
import useSnackbar from "@/hooks/useSnackbar";

const updateProjectInfo = async (projectSettingForm: ProjectSettingForm, authMap: ProjectTaskAuth, callbackFn: (res: ResponseBody<null>) => void) => {
    if (confirm("프로젝트 정보를 수정하시겠습니까?")) {
        const projectInfo: ProjectInfoUpdateReq = {
            ...projectSettingForm,
            authMap: {...authMap}
        }

        const res: ResponseBody<null> = await updateProjectInfoAPI(projectInfo);
        callbackFn(res);
    }
}


function ProjectSettingFormSaveButton() {
    const {
        state: projectSettingLoadingState,
        contents: projectSettingForm
    } = useRecoilValueLoadable(projectSettingFormState);

    const {state: authState, contents: authContents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const resetProjectInfo = useResetRecoilState(projectInfoState(null));

    const _updateProjectInfo = () => {
        updateProjectInfo(projectSettingForm, authContents.data, (res) => {
            if (res.result === 'success') {
                setSuccessSnackbar('프로젝트 정보를 수정했습니다.');
                resetProjectInfo();
            } else {
                setErrorSnackbar(res.message);
            }
        })
    }

    const isUpdating = projectSettingLoadingState === 'loading' || authState === 'loading';
    const isUpdateError = authState !== 'loading' && authContents.result === "error";

    return (
        <Button size="md" onClickHandler={_updateProjectInfo} disabled={isUpdating || isUpdateError}
                className={
                    `${
                        (isUpdating || isUpdateError)
                        && '!bg-gray-400 !text-white'
                    }`
                }>
            저장
        </Button>
    );
}

export default ProjectSettingFormSaveButton;