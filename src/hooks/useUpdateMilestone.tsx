import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMilestone as updateMilestoneAPI} from "@/service/project/milestone";
import {snackbarState} from "@/store/CommonStateStore";

export default function useUpdateMilestone() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const currentForm = useRecoilValue(milestoneModalFormState);

    const queryClient = useQueryClient();

    const {mutate: updateMilestone, isPending: isUpdating} = useMutation({
        mutationFn: () => updateMilestoneAPI({milestoneInfo: currentForm!}),
        onSuccess: async (data, variables, context) => {
            if (data.result === 'success') {
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