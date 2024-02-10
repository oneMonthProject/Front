'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {getTodayString} from "@/utils/common";
import {MilestoneInfo} from "@/utils/type";
import {MilestoneModalForm, milestoneModalFormState} from "@/store/project/task/MilestoneStateStore";
import {useSetRecoilState} from "recoil";
import {useProjectInfo} from "@/hooks/useProjectInfo";
import {snackbarState} from "@/store/CommonStateStore";

function MilestoneAddButton() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const {authMap: {milestoneAuth}} = useProjectInfo();
    const setMilestoneModalForm = useSetRecoilState(milestoneModalFormState);

    const onClickHandler = () => {
        if(milestoneAuth){
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
        }else{
            setSnackBar({show:true, type:'INFO', content:'마일스톤 생성 권한이 없습니다.'});
        }

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