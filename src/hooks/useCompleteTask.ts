import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useResetRecoilState} from "recoil";
import useSnackbar from "@/hooks/useSnackbar";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {workComplete, WorkCompleteRequestDto} from "@/service/project/confirm";

export default function useCompleteTask() {
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const resetCurrentForm = useResetRecoilState(taskModalState);

    const queryClient = useQueryClient();

    const {mutate: completeTask, isPending: isUpdating} = useMutation({
        mutationFn: (reqData: WorkCompleteRequestDto) => workComplete(reqData),
        onSuccess: async (res) => {
            if (res.result === "success") {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetCurrentForm();
                setSuccessSnackbar('업무를 완료했습니다.');
            } else {
                setErrorSnackbar('프로세스 수행중 에러가 발생했습니다.');
            }
        },
        onError: (error) => {
            setErrorSnackbar(error.message);
        }
    });

    return {completeTask, isUpdating};
}