import {useMutation, useQueryClient} from "@tanstack/react-query";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {updateTask as updateTaskAPI} from "@/service/project/task";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {TaskModifyForm} from "@/app/project/@task/_utils/type";
import useSnackbar from "@/hooks/useSnackbar";

function useUpdateTask() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const resetCurrentForm = useResetRecoilState(taskModalState);

    const queryClient = useQueryClient();

    const {mutate: updateTask, isPending: isUpdating} = useMutation({
        mutationFn: (currentForm: TaskModifyForm) => updateTaskAPI(currentForm),
        onSuccess: async (res, variables, context) => {
            if (res.result === "success") {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetCurrentForm();
                setSuccessSnackbar('업무를 수정했습니다.');
            } else {
                setErrorSnackbar('프로세스 수행중 에러가 발생했습니다.');
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {updateTask, isUpdating};

}

export default useUpdateTask;