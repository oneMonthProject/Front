import React from 'react';
import {BsChevronDown} from "@react-icons/all-files/bs/BsChevronDown";
import useDropdownState from "@/hooks/useDropdownState";
import {usePositionList} from "@/hooks/usePositionList";
import PositionDropdownList from "@/components/ui/dropdown/PositionDropdownList";
import {useRecoilState} from "recoil";
import {selectedPositionState} from "@/store/post/PostStateStore";

function PositionFilter() {
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState);
    const {dropdownRef, openDropdown, setOpenDropdown} = useDropdownState();

    const {data: positions, isFetching} = usePositionList();

    if (isFetching) return (
        <div className='relative z-10 self-center'>
            <div
                className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer bg-gray-300 animate-pulse">
                <div className="text-base text-grey800 mobile:text-sm">
                    {"포지션"}
                </div>
                <BsChevronDown className="w-4 h-4 text-grey800"/>
            </div>
        </div>
    );

    return (
        <div ref={dropdownRef} className="relative z-10 self-center" onClick={() => setOpenDropdown(!openDropdown)}>
            <div
                className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
                <div className="text-base text-grey800 mobile:text-sm">
                    {selectedPosition ? selectedPosition.positionName : "포지션"}
                </div>
                <BsChevronDown className="w-4 h-4 text-grey800"/>
            </div>
            {openDropdown && (
                <PositionDropdownList positionItems={positions!.data!} onChangeValue={setSelectedPosition}/>
            )}
        </div>
    );
}

export default PositionFilter;