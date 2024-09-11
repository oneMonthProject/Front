'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getTodayString} from "@/utils/common";
import {MilestoneInfo} from "@/utils/type";
import {MilestoneModalForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useSetRecoilState} from "recoil";
import {MilestoneAddButtonSkeleton} from "@/components/ui/skeleton/project/task";
import useCurrentUserPMAuth from "@/hooks/useCurrentUserPMAuth";

function MilestoneAddButton({projectId, userId}: { projectId: string, userId: string }) {
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);

    if (isFetchingCurrentUserPMAuth) return <MilestoneAddButtonSkeleton/>;

    const onClickHandler = () => {
        const today = getTodayString();
        const addMilestoneForm: MilestoneInfo = {
            content: "",
            createDate: today,
            mileStoneId: 0n,
            progressStatus: "",
            projectId: projectId,
            startDate: '',
            endDate: '',
            updateDate: today,
            authMap: currentUserPMAuth!
        }

        setMilestoneModalForm(new MilestoneModalForm("add", addMilestoneForm));

    }

    return (
        <Button size='md' className='mb-4' onClickHandler={onClickHandler} aria-label='마일스톤 추가'>
                <span className='flex items-center'>
                  <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                  마일스톤 추가
                </span>
        </Button>
    );
}

export default MilestoneAddButton;