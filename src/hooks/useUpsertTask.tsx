'use client';

import {TaskModalForm, taskModalFormState} from "@/store/project/task/TaskStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {upsertTask as upsertTaskApi} from "@/service/project/task";
import {NoticeCreateForm} from "@/utils/type";
import {createProjectTaskNotice} from "@/service/project/notice";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";


export default function useUpsertTask(){
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(taskModalFormState);

    const queryClient = useQueryClient();

    const {mutate: upsertTask, isPending: isUpdating} = useMutation({
        mutationFn: (currentForm: TaskModalForm) => upsertTaskApi(currentForm),
        onSuccess: async (res, variables, context) => {
            if (res.result === "success") {
                const {progressStatusCode, projectId, workId, assignedUser, milestoneId, type} = variables;

                // 업무 완료/만료시 알림 생성
                if (progressStatusCode === 'PS003' || progressStatusCode === 'PS004') {
                    const content = progressStatusCode === 'PS003'
                        ? `${assignedUser?.nickname}님이 업무를 완료했습니다.`
                        : `${assignedUser?.nickname}님의 업무가 만료되었습니다.`
                    const noticeCreateForm: NoticeCreateForm = {
                        projectId,
                        workId,
                        milestoneId,
                        content,
                        type: 'WORK',
                        sendUserId: assignedUser?.projectMemberId
                    };

                    const res = await createProjectTaskNotice(noticeCreateForm);
                    console.log("업무 알림 생성 res: ", res);

                }

                resetCurrentForm();

                await queryClient.invalidateQueries({queryKey: ['taskList']});

                const content = type === 'add' ? '업무를 생성을 완료했습니다.' : '업무 수정을 완료했습니다.';
                setSnackbar({show: true, type: 'SUCCESS', content});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {upsertTask, isUpdating};
}