import React from 'react';
import useDropdownState from "@/hooks/useDropdownState";
import {useRecoilState} from "recoil";
import {selectRecruitPositionState} from "@/store/postDetail/PostDetailStateStore";
import {PostDetailPosition} from "@/utils/type";
import {BsChevronDown} from "@react-icons/all-files/bs/BsChevronDown";
import PositionDropdownList from "@/components/ui/dropdown/PositionDropdownList";

function RecruitPositionDropdown({recruitPositions}: { recruitPositions: PostDetailPosition[] }) {
    const {dropdownRef, openDropdown, setOpenDropdown} = useDropdownState();
    const [recruitPosition, setRecruitPosition] = useRecoilState(selectRecruitPositionState);

    return (
        <div ref={dropdownRef} className="relative z-10 self-center" onClick={() => setOpenDropdown(!openDropdown)}>
            <div
                className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
                <div className="text-base text-grey800 mobile:text-sm">
                    {recruitPosition ? recruitPosition.positionName : "포지션"}
                </div>
                <BsChevronDown className="w-4 h-4 text-grey800"/>
            </div>
            {openDropdown && (
                <PositionDropdownList
                    direction='up'
                    positionItems={
                        recruitPositions.map(({position: {positionId, name}}) => ({
                            positionId,
                            positionName: name
                        }))}
                    onChangeValue={setRecruitPosition}
                />
            )}
        </div>
    );
}

export default RecruitPositionDropdown;