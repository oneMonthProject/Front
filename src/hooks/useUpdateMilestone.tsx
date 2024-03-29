import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {
    getMilestoneStatus,
    MilestoneActiveState,
    milestoneActiveStateStore,
    milestoneModalFormState
} from "@/store/project/task/MilestoneStateStore";
import {useMutation} from "@tanstack/react-query";
import {updateMilestone as updateMilestoneAPI} from "@/service/project/milestone";
import {useQueryClient} from "@tanstack/react-query";
import {snackbarState} from "@/store/CommonStateStore";

export default function useUpdateMilestone() {
    const [snackbar, setSnackBar] = useRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const currentForm = useRecoilValue(milestoneModalFormState);
    const [activeMilestone, setActiveMilestone] = useRecoilState(milestoneActiveStateStore);

    const queryClient = useQueryClient();

    const {mutate: updateMilestone, isPending: isUpdating} = useMutation({
        mutationFn: () => updateMilestoneAPI({milestoneInfo: currentForm!}),
        onSuccess: async (data, variables, context) => {
            if (data.result === 'success') {

                setActiveMilestone((prev) => {
                    return {
                        ...prev,
                        content: currentForm?.content,
                        startDate: currentForm?.startDate,
                        endDate: currentForm?.endDate,
                        progressStatusCode: currentForm?.progressStatusCode,
                        progressStatus: getMilestoneStatus(currentForm!.progressStatusCode)?.name
                    } as MilestoneActiveState;
                });

                resetCurrentForm();
                await queryClient.invalidateQueries({queryKey: ['milestoneList']});
                setSnackBar({show: true, content: '마일스톤을 수정했습니다.', type: 'SUCCESS'})
            } else {
                setSnackBar({show: true, content: '마일스톤 수정에 실패했습니다', type: 'ERROR'})
            }


        },
        onError: (err) => {
            console.log("mutation err: ", err);
        }
    });

    return {updateMilestone, isUpdating};
}