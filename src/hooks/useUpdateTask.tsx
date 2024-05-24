import {useMutation, useQueryClient} from "@tanstack/react-query";
import {taskModalState} from "@/store/project/task/TaskStateStore";
import {updateTask as updateTaskAPI} from "@/service/project/task";
import {NoticeCreateForm} from "@/utils/type";
import {createProjectTaskNotice} from "@/service/project/notice";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {TaskModifyForm} from "@/app/project/@task/_utils/type";
import {TASK_STATUS as TS} from "@/app/project/@task/_utils/constant";
import {PROJECT_NOTICE_TYPE as PNT} from "@/app/project/@notice/_utils/constant";

function useUpdateTask() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetCurrentForm = useResetRecoilState(taskModalState);

    const queryClient = useQueryClient();

    const {mutate: updateTask, isPending: isUpdating} = useMutation({
        mutationFn: (currentForm: TaskModifyForm) => updateTaskAPI(currentForm),
        onSuccess: async (res, variables, context) => {
            if (res.result === "success") {
                const {
                    progressStatus,
                    projectId,
                    workId,
                    assignedUser,
                    milestoneId,
                    content: taskContent
                } = variables;

                // 업무 완료/만료시 알림 생성
                if (progressStatus === TS.FINISH.name || progressStatus === TS.EXPIRED.name) {
                    const content = progressStatus === TS.FINISH.name
                        ? `${assignedUser?.nickname}님이 ${taskContent}(을)를 완료했습니다.`
                        : `${assignedUser?.nickname}님의 ${taskContent}(이)가 만료되었습니다.`

                    const noticeCreateForm: NoticeCreateForm = {
                        projectId,
                        workId,
                        milestoneId,
                        content,
                        type: PNT.WORK.value,
                        sendUserId: assignedUser?.projectMemberId
                    };

                    const res = await createProjectTaskNotice(noticeCreateForm);

                    if(res.result !== 'success'){
                        setSnackbar({show: true, type: 'ERROR', content: '업무 알림 발송 중 에러가 발생했습니다.'});
                        return;
                    }
                }

                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 수정했습니다.'});
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetCurrentForm();
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {updateTask, isUpdating};

}

export default useUpdateTask;