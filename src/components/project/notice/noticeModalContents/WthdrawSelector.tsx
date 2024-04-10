import React from 'react';
import {useRecoilState} from "recoil";
import {ProjectNoticeCrewFWDLForm, projectNoticeCurrentFormState} from "@/store/project/notice/ProjectNoticeStateStore";
import {SelectItem} from "@/utils/type";
import Select from "@/components/ui/Select";
import {
    ForceWDLOption,
    ForceWDLOptionNameType as NameType,
    ForceWDLOptionValueType as ValueType, PROJECT_NOTICE_TYPE as PNT
} from "@/app/project/@notice/_utils/constant";
import {ProjectNoticeCrewFWDL} from "@/app/project/@notice/_utils/type";

const selectItems = Object.values(ForceWDLOption);

function WthdrawSelector() {
    const [currentNoticeForm, setCurrentNoticeForm] = useRecoilState(projectNoticeCurrentFormState);

    function onChangeJoinPermitHandler(selectItem: SelectItem<NameType, ValueType>) {
        const form: ProjectNoticeCrewFWDL = {
            ...currentNoticeForm!.form,
            withdrawConfirm: selectItem.value
        };
        const updatedNoticeFormState: ProjectNoticeCrewFWDLForm = {name: PNT.FORCEWITHDRAWL.value, form};
        setCurrentNoticeForm(updatedNoticeFormState);
    }

    const selectedValue = selectItems.find(
        v => v.value === (currentNoticeForm as ProjectNoticeCrewFWDLForm)
            .form.withdrawConfirm
    )!;

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