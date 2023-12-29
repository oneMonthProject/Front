'use client';
import React, {MouseEvent, useEffect} from 'react';
import {MilestoneInfo} from "@/utils/type";
import MilestoneCardMenu from "@/components/project/task/milestone/MilestoneCardMenu";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    milestoneActiveStateStore,
    milestoneModalFormState,
    MilestoneModalForm,
    MilestoneModalFormState, MilestoneStatusName
} from "@/store/project/task/MilestoneStateStore";
import MilestoneStatusBadge from "@/components/ui/badge/MilestoneStatusBadge";
import {deleteMilestone as deleteMilestoneAPI} from "@/service/project/milestone";
import {useMutation} from "@tanstack/react-query";
import {useQueryClient} from "@tanstack/react-query";
import {snackbarState} from "@/store/MainStateStore";

interface MilestoneCardProps {
    milestoneInfo: MilestoneInfo;
    isInitActive: boolean;
    slideIndex: number;
}

function MilestoneCard({milestoneInfo, isInitActive, slideIndex}: MilestoneCardProps) {
    const {
        mileStoneId,
        content,
        startDate,
        endDate,
        updateDate,
        createDate,
        progressStatus
    } = milestoneInfo;

    const [snackbar, setSnackBar] = useRecoilState(snackbarState);
    const [activeMilestone, setActiveMilestone] = useRecoilState(milestoneActiveStateStore);
    const setMilestoneModalForm = useSetRecoilState<null | MilestoneModalFormState>(milestoneModalFormState);

    // active 상태 초기화
    useEffect(() => {
        if (isInitActive && activeMilestone === null) {
            setActiveMilestone({
                activeId: mileStoneId,
                content,
                startDate,
                endDate,
                progressStatus: progressStatus as MilestoneStatusName,
                slideIndex
            });
        }
    }, [isInitActive]);


    const queryClient = useQueryClient();
    const {mutate: deleteMilestone, isPending: isDeleting} = useMutation({
        mutationFn: (mileStoneId: bigint) => deleteMilestoneAPI(mileStoneId),
        onSuccess: (res) => {
            if (res.status !== 200) {
                if (res.status === 500) {
                    setSnackBar({show: true, content: '예상치 못한 서버 에러가 발생했습니다.', type: 'ERROR'});
                }
            } else {
                setSnackBar({show: true, content: '마일스톤을 삭제했습니다.', type: 'INFO'});
                queryClient.invalidateQueries({queryKey: ['milestoneList']})
            }
        },
        onError: (error) => {
            setSnackBar({show: true, content: '예상치 못한 서버 에러가 발생했습니다.', type: 'ERROR'});
        }
    })


    function onClickContentHandler(e: MouseEvent<HTMLElement>) {
        if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
        setActiveMilestone({
            activeId: mileStoneId,
            content,
            startDate,
            endDate,
            progressStatus: progressStatus as MilestoneStatusName,
            slideIndex
        });
    }

    function onEditClickHandler() {
        setMilestoneModalForm(
            new MilestoneModalForm(
                'modify',
                milestoneInfo
            )
        );
    }

    async function onDeleteClickHandler() {
        await deleteMilestone(mileStoneId);
    }


    const activeClass = activeMilestone?.activeId === mileStoneId ? 'ring-2 ring-primary' : 'shadow-md';
    const textClass = activeMilestone?.activeId === mileStoneId ? 'text-secondary' : 'text-gray-900';

    return (
        <div
            className={`relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible ${activeClass} cursor-pointer`}
            onClick={onClickContentHandler}
        >
            <div className="flex-1 truncate px-4 text-sm">
                <div
                    className={`mb-2 flex items-center space-x-2 pc:text-xl tablet:text-lg ${textClass} hover:text-secondary`}>
                    <span>{content}</span>
                    <MilestoneStatusBadge text={progressStatus} size='sm'/>
                </div>
                <div
                    className="flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500">
                    <span>{startDate} &#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
            <MilestoneCardMenu
                milestoneId={mileStoneId}
                onEditClickHandler={onEditClickHandler}
                onDeleteClickHandler={onDeleteClickHandler}
            />
        </div>
    );
}

export default MilestoneCard;