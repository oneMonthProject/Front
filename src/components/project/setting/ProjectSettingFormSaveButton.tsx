'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {ProjectInfoUpdateReq, ProjectSettingForm} from "@/app/project/@setting/_utils/type";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";
import {updateProjectInfo as updateProjectInfoAPI} from "@/service/project/project";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {projectSettingFormState} from "@/store/project/setting/ProjectSettingFormStateStore";
import useSnackbar from "@/hooks/useSnackbar";
import {useRouter} from "next/navigation";
import {userStateStore} from "@/store/user/UserStateStore";

const updateProjectInfo = async (projectSettingForm: ProjectSettingForm, authMap: ProjectAuthMap, callbackFn: (res: ResponseBody<null>) => void) => {
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
    const router = useRouter();
    const userId = useRecoilValue(userStateStore);
    const {
        state: projectSettingLoadingState,
        contents: projectSettingForm
    } = useRecoilValueLoadable(projectSettingFormState);

    const {state: authState, contents: authContents} = useRecoilValueLoadable(projectTaskAuthSelector(null));

    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const _updateProjectInfo = () => {
        updateProjectInfo(projectSettingForm.data, authContents.data, (res) => {
            if (res.result === 'success') {
                setSuccessSnackbar('프로젝트 정보를 수정했습니다.');
                router.replace(`/project?projectId=${projectSettingForm.data.projectId}&userId=${userId}`);
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