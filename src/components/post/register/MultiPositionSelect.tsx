import MultiSelect from "@/components/ui/MultiSelect";
import {usePositionList} from "@/hooks/usePositionList";
import {getPositionSelectItems} from "@/utils/common";
import {PositionId, SelectItem} from "@/utils/type";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import React from "react";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

interface MultiPositionSelectProps {
    positions: SelectItem<string, string>[] | PositionId[];
    singleItemType?: 'position' | 'positionId'
    setPositions: (item: SelectItem<string, string>[]) => void;
    required?: boolean;
}

const MultiPositionSelect = (
    {
        positions,
        setPositions,
        required,
        singleItemType = 'position'
    }: MultiPositionSelectProps) => {

    const setSnackBar = useSetRecoilState(snackbarState);
    const {data: positionList, isFetching, isError} = usePositionList();

    if (isFetching) return <SelectSkeleton label="모집 분야" placeholder="모집 분야를 선택해주세요."/>;
    if (isError) setSnackBar({show: true, type: 'ERROR', content: '포지션 목록을 가져올 수 없습니다'});

    let selectedPositions: SelectItem<string, string>[];

    if (singleItemType === 'positionId') {
        selectedPositions = positionList
            .filter(({positionId, positionName}) => positions.includes(positionId))
            .map(({positionId, positionName}) => ({name: positionName, value: positionId}));
    } else {
        selectedPositions = positions;
    }

    return <MultiSelect
        values={selectedPositions}
        setValues={setPositions}
        items={getPositionSelectItems(positionList!)}
        label="모집 분야"
        placeholder="모집 분야를 선택해주세요."
        required={required}
    />
}

export default MultiPositionSelect;