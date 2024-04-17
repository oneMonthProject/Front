'use client';

import Select from "@/components/ui/Select"
import {getTrustGradeListByUser} from "@/service/user/user";
import {ResponseBody, SelectItem, TrustGradeItem} from "@/utils/type";
import {useQuery} from "@tanstack/react-query";
import {TrustGradeIdType} from "@/app/project/@setting/_utils/type";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import React from "react";
import useGradeListByUser from "@/hooks/useGradeListByUser";

interface TrustGradeSelectProps {
    trustGrade: SelectItem<string, TrustGradeIdType>;
    setTrustGrade: (item: SelectItem<string, TrustGradeIdType>) => void;
}


const TrustGradeSelect = ({trustGrade, setTrustGrade}: TrustGradeSelectProps) => {
    const {gradeList, isFetching} = useGradeListByUser(trustGrade);

    if(isFetching) return <SelectSkeleton label='프로젝트 신뢰등급' placeholder='신뢰등급 선택'/>

    const selectItems: SelectItem<string, TrustGradeIdType>[] =
        gradeList.map(({trustGradeId, trustGradeName}) =>
            ({name: trustGradeName, value: trustGradeId}))
        || [];

    selectItems.unshift({name: '신뢰등급 선택', value: null});

    const selected = selectItems.find(({name, value}) => value === trustGrade.value) || {name: '신뢰등급 선택', value: null};


    return <Select value={selected} setValue={setTrustGrade} items={selectItems}
                   label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>
}

export default TrustGradeSelect;