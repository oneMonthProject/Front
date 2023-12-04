'use client';
import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";

export default function TaskSectionHeader() {
    // todo - 마일스톤 아이디로 조회
    return (
        <div className='w-full flex items-center justify-between mb-4'>
            <Button size='md'>
                <span className='flex items-center'>
                    <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                    업무 추가
                </span>
            </Button>
            <div className='ml-4 mr-auto flex items-center'>
                <h3 className='my-2 tablet:text-3xl font-medium text-greyDarkBlue'>프로젝트 기획</h3>
                <span className='ml-3 tablet:text-xl text-grey800'>: 2023-12-01 ~ 2023-12-07</span>
            </div>
        </div>
    );
}