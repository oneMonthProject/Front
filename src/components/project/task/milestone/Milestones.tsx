import React from 'react';
import {useQueryString} from "@/hooks/useQueryString";
import MilestoneCard from "@/components/project/task/milestone/MilestoneCard";
import {MilestoneInfo} from "@/utils/type";
import CustomSwiper from "@/components/ui/CustomSwiper";
const milestoneInfo: MilestoneInfo[] = [
    {
        milestone_id: '1',
        milestone_content: '프로젝트 기획',
        start_date: '2023-12-01',
        end_date: '2023-12-07'
    },
    {
        milestone_id: '2',
        milestone_content: '개발환경 세팅',
        start_date: '2023-12-08',
        end_date: '2023-12-12'
    },
    {
        milestone_id: '3',
        milestone_content: '퍼블리싱',
        start_date: '2023-12-13',
        end_date: '2023-12-15'
    },
    {
        milestone_id: '4',
        milestone_content: 'api 연동',
        start_date: '2023-12-20',
        end_date: '2023-12-30'
    }
];


function Milestones() {
    // todo - async로 마일스톤 데이터 조회
    const projectId = useQueryString('projectId');

    // milestoneInfo = [];

    return milestoneInfo.length > 0
        ? (
            <CustomSwiper
                slideItems={milestoneInfo.map(v => (
                    {
                        key: v.milestone_id,
                        components: <MilestoneCard milestoneInfo={v} />
                    }
                ))}
            />
        )
        : (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        );
}

export default Milestones;