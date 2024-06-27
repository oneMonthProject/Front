'use client';

import {useMutation} from "@tanstack/react-query";
import {requestParticipationProject as requestParticipationProjectAPI} from "@/service/project/participate";
import {isEqual} from "lodash";
import useSnackbar from "@/hooks/useSnackbar";
import {useResetRecoilState} from "recoil";
import {confirmModalState} from "@/store/CommonStateStore";

export default function useJoinProject(){
    const resetModalState = useResetRecoilState(confirmModalState);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const { mutate: joinProject, isPending } = useMutation({
        mutationFn: ({projectId, positionId}:{projectId:bigint, positionId: bigint}) => requestParticipationProjectAPI(projectId, positionId),
        onSuccess: async (data) => {
            const { message, result } = data;
            if (isEqual(result, "success")) {
                setSuccessSnackbar(message);
                resetModalState();
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    return {joinProject, isUpdating:isPending};
}