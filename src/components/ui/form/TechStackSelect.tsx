import MultiSelect from "@/components/ui/MultiSelect";
import {useTechStackList} from "@/hooks/useTechStackList";
import {getTechStackSelectItems} from "@/utils/common";
import {SelectItem, TechStackId} from "@/utils/type";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import React from "react";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

interface TechStackSelectProps {
    techStacks: SelectItem<string,string>[] | TechStackId[];
    singleItemType?: 'techStacks' | 'techStackIds'
    setTechStacks: (item: SelectItem<string, string>[]) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}


const TechStackSelect = ({techStacks, setTechStacks, label, placeholder, required, singleItemType = 'techStacks'}: TechStackSelectProps) => {
    const setSnackBar = useSetRecoilState(snackbarState);
    const {data:techStackList, isError, isFetching} = useTechStackList();

    if(isFetching) return <SelectSkeleton label="사용 스택" placeholder="사용 스택을 선택해주세요."/>;
    if(isError) setSnackBar({show:true, type:'ERROR', content:'포지션 목록을 가져올 수 없습니다'});

    let selectedTechStacks:SelectItem<string, string>[];
    if(singleItemType === 'techStackIds'){
        selectedTechStacks = techStackList
            .filter(({techStackId}) => techStacks.includes(techStackId))
            .map(({techStackId, techStackName}) => ({name:techStackName, value:techStackId}));
    }else{
        selectedTechStacks = techStacks;
    }

    return <MultiSelect
                values={selectedTechStacks}
                setValues={setTechStacks}
                items={getTechStackSelectItems(techStackList!)}
                label={label}
                placeholder={placeholder}
                required={required}
             />
}

export default TechStackSelect;