'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getTodayString} from "@/utils/common";
import {MilestoneInfo, ProjectAuthMap, ResponseBody} from "@/utils/type";
import {MilestoneModalForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useRecoilValueLoadable, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import {MilestoneAddButtonSkeleton} from "@/components/ui/skeleton/project/task";

function MilestoneAddButton({projectId, userId}: { projectId: string, userId: string }) {
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);

    const stateParam = JSON.stringify({projectId, userId});
    const {
        state: authState,
        contents
    } = useRecoilValueLoadable<ResponseBody<ProjectAuthMap | null>>(projectTaskAuthSelector(stateParam)); // 프로젝트 상세정보 중 auth state

    if (authState === 'loading') return <MilestoneAddButtonSkeleton/>;

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
            authMap: contents.data
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