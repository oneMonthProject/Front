'use client';

import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask as createTaskAPI} from "@/service/project/task";
import {TaskItem} from "@/app/project/@task/_utils/type";

function useCreateTask() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(taskModalState);

    const queryClient = useQueryClient();

    const {mutate: createTask, isPending: isCreating} = useMutation({
        mutationFn: (currentForm: TaskItem) => createTaskAPI(currentForm),
        onSuccess: async (res) => {
            if (res.result === "success") {
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 생성했습니다.'});
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetCurrentForm();
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {createTask, isCreating};
}

export default useCreateTask;