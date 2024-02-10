import React from 'react';
import {useRecoilState} from "recoil";
import {
    ProjectNoticeCrewWithdrawForm,
    projectNoticeCurrentFormState
} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import Select from "@/components/ui/Select";

const selectItems: SelectItem[] = [
    {
        name: '선택',
        value: ''
    },
    {
        name: '탈퇴',
        value: true
    },
    {
        name: '보류',
        value: false
    }
];

function WthdrawSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem) {
        if (currentNoticeForm instanceof ProjectNoticeCrewWithdrawForm) {
            const updatedNoticeForm = {...currentNoticeForm, withdrawConfirm: selectItem.value};
            setCurrentNoticeForm(updatedNoticeForm);
        }
    }

    const selectedValue: SelectItem = selectItems.find(v => v.value === (currentNoticeForm as ProjectNoticeCrewWithdrawForm).withdrawConfirm)!;

    return (
        <section className='mx-auto my-7 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold my-6'>
                탈퇴 여부를 선택해주세요.
            </label>
            <div className='mx-auto'>
                <Select
                    items={selectItems}
                    label=''
                    setValue={onChangeJoinPermitHandler}
                    value={selectedValue}/>
            </div>
        </section>
    );
}

export default WthdrawSelector;