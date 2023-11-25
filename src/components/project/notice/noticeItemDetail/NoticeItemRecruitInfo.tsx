import React from 'react';
import TechStackImage from "@/components/ui/TechStackImage";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import Avatar from "@/components/ui/Avatar";
import DefaultAvatar from "../../../../../public/images/defaultAvatar.png";

function NoticeItemRecruitInfo() {
    return (
        <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-t border-b border-grey300 '>
            <div><Avatar src={DefaultAvatar} alt='사용자 아바타' size='sm'/></div>
            <h3 className='my-1 text-[1.2rem] text-greyDarkBlue font-medium'>찐개발자</h3>
            <div className='text-md text-greyBlue font-medium'>프론트엔드</div>
            <div className='mt-1 text-sm text-grey700'>개발 N년차 웹 프론트엔드 개발자 입니다.</div>
            <ul className='mt-2 flex items-center justify-center space-x-1'>
                <li
                    key='javascript'
                    className='relative h-10 w-10'
                >
                    <TechStackImage stackName='javascript'/>
                </li>
                <li
                    key='typescript'
                    className='relative h-10 w-10'
                >
                    <TechStackImage stackName='typescript'/>
                </li>
                <li
                    key='react'
                    className='relative h-12 w-10'
                >
                    <TechStackImage stackName='react'/>
                </li>
                <li
                    key='vue'
                    className='relative h-10 w-10'
                >
                    <TechStackImage stackName='vue'/>
                </li>
            </ul>
            <div className='mt-5 mb-7 flex items-center justify-center space-x-4'>
                <div className='flex flex-col px-3 border-r-2 border-grey300'>
                    <span className='mb-2 text-md font-medium text-greyBlue'>프로젝트</span>
                    <span className='text-md text-grey900'>3</span>
                </div>
                <div className='flex flex-col'>
                    <span  className='mb-2 text-md font-medium text-greyBlue'>신뢰등급</span>
                    <span className='text-grey900'><TrustGradeBadge size='xs' color='red' text='1등급'/></span>
                </div>
                <div className='flex flex-col pl-3 border-l-2 border-grey300'>
                    <span className='mb-2 text-md font-medium text-greyBlue'>신뢰점수</span>
                    <span className='text-md text-grey900'>1200점</span>
                </div>
            </div>
        </section>
    );
}

export default NoticeItemRecruitInfo;