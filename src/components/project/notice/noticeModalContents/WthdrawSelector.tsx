import React from 'react';
import {useRecoilState} from "recoil";
import {projectNoticeCrewWithdrawState} from "@/store/project/notice/ProjectNoticeStateStore";
import Select from "@/components/ui/selector/Select";
import {CrewWithdrawOption} from "@/app/project/@notice/_utils/constant";

const selectItems = Object.values(CrewWithdrawOption);

function WthdrawSelector() {
    const [{withdrawConfirm}, setWithdrawConfirm] = useRecoilState(projectNoticeCrewWithdrawState);

    return (
        <section className='mx-auto my-7 flex flex-col items-stretch'>
            <label className='tablet:text-[1.45rem] mobile:text-xl text-grey900 font-semibold my-6'>
                탈퇴 여부를 선택해주세요.
            </label>
            <div className='mx-auto'>
                <Select
                    items={selectItems}
                    label=''
                    setValue={
                        (item) =>
                            setWithdrawConfirm({withdrawConfirm: item.value})
                    }
                    value={selectItems.find(v => v.value === withdrawConfirm)!}/>
            </div>
        </section>
    );
}

export default WthdrawSelector;