'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {useRecoilValue} from "recoil";
import {projectSettingInfoStateStore} from "@/store/project/setting/ProjectSettingFormStateStore";
import useSnackbar from "@/hooks/useSnackbar";
import {updateProjectSettingInfo as updateProjectSettingInfoAPI} from "@/service/project/setting/info";
import {useMutation, useQueryClient} from "@tanstack/react-query";


function ProjectSettingFormSaveButton() {
    const queryClinet = useQueryClient();
    const projectSettingInfo = useRecoilValue(projectSettingInfoStateStore);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const {mutate: updateProjectSettingInfo, isPending} = useMutation({
        mutationFn: () => updateProjectSettingInfoAPI(projectSettingInfo),
        onSuccess: async (data) => {
            const {message, result} = data;
            if (result === 'success') {
                await queryClinet.invalidateQueries({queryKey: ['projectSettingInfo']});
                setSuccessSnackbar("프로젝트 정보를 수정했습니다.");
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (err) => {
            setErrorSnackbar("프로세스 수행 중 오류가 발생했습니다.");
            console.error(err.cause);
        }
    })


    return (
        <Button
            size="md"
            onClickHandler={updateProjectSettingInfo} disabled={isPending}
            className={`${isPending && '!bg-gray-400 !text-white'}`}
        >
            저장
        </Button>
    );
}

export default ProjectSettingFormSaveButton;