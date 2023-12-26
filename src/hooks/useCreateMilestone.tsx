'use client';
import {useRecoilValue, useResetRecoilState} from "recoil";
import {milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMilestone as createMilestoneAPI} from "@/service/project/milestone";
import {useQueryString} from "@/hooks/useQueryString";

export default function useCreateMilestone(){
    const projectId = useQueryString('projectId');
    const currentForm = useRecoilValue(milestoneModalFormState);
    const resetCurrentForm = useResetRecoilState(milestoneModalFormState);

    const queryClient = useQueryClient();

    const {mutate:createMilestone, isPending:isCreating} = useMutation({
        mutationFn: () => createMilestoneAPI({milestoneInfo:currentForm!, projectId}),
        onSuccess:(data, variables, context) => {
            resetCurrentForm();
            queryClient.invalidateQueries({queryKey:['milestoneList']})
        },
        onError:(err) => {
            console.log("mutation err: ",err);
        }
    });

    return {createMilestone, isCreating};
}