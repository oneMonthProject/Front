'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getTodayString} from "@/utils/common";
import {MilestoneInfo} from "@/utils/type";
import {MilestoneModalForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {projectUserAuthStateStore} from "@/store/project/crews/ProjectUserAuthStateStore";

function MilestoneAddButton() {
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);
    const authInfo = useRecoilValue(projectUserAuthStateStore);

    const onClickHandler = () => {
        const today = getTodayString();

        const addMilestoneForm: MilestoneInfo = {
            content: "",
            createDate: today,
            endDate: "",
            mileStoneId: 0n,
            progressStatus: "",
            projectId: 0n,
            startDate: today,
            updateDate: today
        }

        setMilestoneModalForm(new MilestoneModalForm("add", addMilestoneForm));
    }

    return (
        authInfo?.milestoneAuth ?
            <Button size='md' className='mb-4' onClickHandler={onClickHandler} aria-label='마일스톤 추가'>
                <span className='flex items-center'>
                  <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                  마일스톤 추가
                </span>
            </Button>
            : null
    );
}

export default MilestoneAddButton;