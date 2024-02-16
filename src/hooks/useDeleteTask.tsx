'use client';

import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask as deleteTaskAPI} from "@/service/project/task";

export default function useDeleteTask(){
    const setSnackbar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const {mutate: deleteTask, isPending: isDeleting} = useMutation({
        mutationFn: (workId: bigint) => deleteTaskAPI(workId),
        onSuccess: async (res) => {
            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 삭제했습니다'});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '예상치 못한 서버 에러가 발생했습니다'});
            }
        },
        onError: (error) => {
            console.log("error: ", error);
            setSnackbar({show: true, type: 'ERROR', content: '예상치 못한 서버 에러가 발생했습니다'});
        }
    });

    return {deleteTask, isDeleting};
}