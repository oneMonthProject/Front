'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getTodayString} from "@/utils/common";
import {MilestoneInfo} from "@/utils/type";
import {MilestoneModalForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useSetRecoilState} from "recoil";
import {useProjectInfo} from "@/hooks/useProjectInfo";

function MilestoneAddButton() {
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);
    const {authMap} = useProjectInfo();

    const onClickHandler = () => {
        const today = getTodayString();

        const addMilestoneForm: MilestoneInfo = {
            content: "",
            createDate: today,
            mileStoneId: 0n,
            progressStatus: "",
            projectId: 0n,
            startDate: '',
            endDate: '',
            updateDate: today
        }

        setMilestoneModalForm(new MilestoneModalForm("add", addMilestoneForm));
    }

    return (
        authMap?.milestoneAuth ?
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