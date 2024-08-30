'use client';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMilestone as createMilestoneAPI} from "@/service/project/milestone";
import {snackbarState} from "@/store/CommonStateStore";
import {ProjectAuthMap} from "@/utils/type";

export default function useCreateMilestone() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const currentForm = useRecoilValue(milestoneModalFormState);
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);

    const queryClient = useQueryClient();

    const {mutate: createMilestone, isPending: isCreating} = useMutation({
        mutationFn: () => createMilestoneAPI({milestoneInfo: currentForm!}),
        onSuccess: async (data, variables, context) => {
            if (data.result === 'success') {
                setSnackbar({show: true, content: '마일스톤을 생성했습니다.', type: 'SUCCESS'});
                resetCurrentForm();
                await queryClient.invalidateQueries({queryKey: ['milestoneList']});
            } else {
                setSnackbar({show: true, content: data.message, type: 'ERROR'});
            }

        },
        onError: (err) => {
            setSnackbar({show: true, content: err.message, type: 'ERROR'});
        }
    });

    return {createMilestone, isCreating};
}