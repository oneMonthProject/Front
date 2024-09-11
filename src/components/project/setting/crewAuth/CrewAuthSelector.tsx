import React from 'react';
import Select from "@/components/ui/selector/Select";
import {ProjectAuthMap} from "@/utils/type";
import useCrewOptionList from "@/hooks/useCrewOptionList";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";

type CrewAuthSelectItem = { name: ProjectAuthMap['name']; value: ProjectAuthMap['code'] };
function CrewAuthSelector({
                              value,
                              setValue
                          }: {
                              value: CrewAuthSelectItem,
                              setValue: (value: CrewAuthSelectItem) => void
                          }
) {
    const {data, isFetching} = useCrewOptionList();

    if(isFetching) return <SelectSkeleton label='' className='w-[230px] mobile:w-[95px] h-[42px]'/>

    const crewOptionSelectItems = data.map((crew) => ({name: crew.name, value: crew.code}));

    return (
        <div className='w-[230px] mobile:w-[95px]'>
            <Select
                items={crewOptionSelectItems}
                setValue={(crew) => setValue(crew)}
                value={value}
            />
        </div>
    );
}

export default CrewAuthSelector;