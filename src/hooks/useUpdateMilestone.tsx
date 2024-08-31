'use client';

import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {milestoneActiveStateStore, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMilestone as updateMilestoneAPI} from "@/service/project/milestone";
import {snackbarState} from "@/store/CommonStateStore";
import {bigIntToString} from "@/utils/common";

export default function useUpdateMilestone() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const resetActiveMilestone = useResetRecoilState(milestoneActiveStateStore);
    const currentForm = useRecoilValue(milestoneModalFormState);

    const queryClient = useQueryClient();

    const {mutate: updateMilestone, isPending: isUpdating} = useMutation({
        mutationFn: () => updateMilestoneAPI({milestoneInfo: currentForm!}),
        onSuccess: async (data) => {
            if (data.result === 'success') {
                resetCurrentForm();
                resetActiveMilestone();
                await queryClient.invalidateQueries({
                    queryKey: ['milestoneList', bigIntToString(currentForm!.projectId)]
                });
                setSnackBar({show: true, content: '마일스톤을 수정했습니다.', type: 'SUCCESS'});
            } else {
                setSnackBar({show: true, content: data.message, type: 'ERROR'});
            }
        },
        onError: (err) => {
            setSnackBar({show: true, content: err.message, type: 'ERROR'});
        }
    });

    return {updateMilestone, isUpdating};
}