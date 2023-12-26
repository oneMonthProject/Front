import {useRecoilValue, useResetRecoilState} from "recoil";
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useMutation} from "@tanstack/react-query";
import {updateMilestone as updateMilestoneAPI} from "@/service/project/milestone";
import {useQueryClient} from "@tanstack/react-query/build/modern";

export default function useUpdateMilestone(){
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);
    const currentForm = useRecoilValue(milestoneModalFormState);

    const queryClient = useQueryClient();

    const {mutate:updateMilestone, isPending:isUpdating} = useMutation({
        mutationFn: () => updateMilestoneAPI({milestoneInfo:currentForm!}),
        onSuccess:(data, variables, context) => {
            console.log("mutation data: ",data);
            resetCurrentForm();
            queryClient.invalidateQueries({queryKey:['milestoneList']});

        },
        onError:(err) => {
            console.log("mutation err: ",err);
        }
    });

    return {updateMilestone, isUpdating};
}