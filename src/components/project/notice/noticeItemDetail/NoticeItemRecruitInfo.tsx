import React from 'react';
import TechStackImage from "@/components/ui/TechStackImage";
import TrustGradeBadge from "@/components/ui/TrustGradeBadge";

function NoticeItemRecruitInfo() {
    return (
        <section className='flex-col items-center'>
            <div className='h-20 w-20 rounded-full border border-black'></div>
            <div>찐개발자</div>
            <div>프론트엔드</div>
            <div>개발 N년차 웹 프론트엔드 개발자 입니다.</div>
            <ul className='flex'>
                <li key='javascript'>
                    <TechStackImage stackName='javascript'/>
                </li>
                <li key='typescript'>
                    <TechStackImage stackName='typescript'/>
                </li>
                <li key='react'>
                    <TechStackImage stackName='react'/>
                </li>
                <li key='vue'>
                    <TechStackImage stackName='vue'/>
                </li>
            </ul>
            <div className='flex'>
                <div className='flex-col px-2 border-r-grey800 border-2'>
                    <span>프로젝트</span>
                    <span>3</span>
                </div>
                <div className='flex-col  border-r-grey800 border-2'>
                    <span>신뢰등급</span>
                    <span><TrustGradeBadge size='sm' color='red' text='1등급'/></span>
                </div>
                <div className='flex-col'>
                    <span>신뢰점수</span>
                    <span>1200점</span>
                </div>
            </div>
        </section>
    );
}

export default NoticeItemRecruitInfo;