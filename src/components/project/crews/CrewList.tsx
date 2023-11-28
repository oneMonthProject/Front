'use client';

import React from "react";
import Avatar from "@/components/ui/Avatar";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import Link from "next/link";
import PositionBadge from "@/components/ui/badge/PositionBadge";

const people = [
    {
        userId: 'Leslie Alexander',
        projectMemberAuth: '매니저',
        position: "프론트엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        userId: 'Michael Foster',
        projectMemberAuth: '부매니저',
        position: "프론트엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        userId: 'Dries Vincent',
        projectMemberAuth: '구성원',
        position: "프론트엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        userId: 'Lindsay Walton',
        projectMemberAuth: '구성원',
        position: "백엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        userId: 'Courtney Henry',
        projectMemberAuth: '구성원',
        position: "백엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        userId: 'Tom Cook',
        projectMemberAuth: '구성원',
        position: "백엔드",
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

// todo - 1. 프로젝트 상세 조회시 받아오는 멤버 정보 + userid로 기타 필요한 정보들 가져와서 list 구성
//  : 프로젝트 멤버 정보 - userId, projectMemberAuthId(아이디가 필요한게 아니라 이름이 필요. 예를 들면 {projectMemberAuth:'매니저'})
//  , position(id, name) : 이것도 id는 필요 x. 불가피하면 같이줘도 되긴함. {position:'프론트엔드'}
//    필요한 정보 -  포지션 정보, 프로젝트 내 권한, 아이디, 프로필 이미지(: 어떻게 저장할건지, 조회가능한건지?), 마지막 작업(? 미확정)
export default function CrewList() {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
                <li key={person.userId} className="flex items-center gap-x-6 py-5 cursor-pointer hover:bg-grey000">
                    <Link href={`/projectmember/${person.userId}/detail`}
                          className="flex items-center min-w-0 tablet:pl-6 mobile:pl-4 tablet:space-x-6 mobile:space-x-4">
                        <Avatar size='xs' src={person.imageUrl} alt={`${person.userId}의 프로필 이미지`}/>
                        <div className="min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4">
                            <p className="tablet:text-[1.2rem] mobile:text-sm font-semibold leading-5 text-gray-900">{person.userId}</p>
                            <ul className='flex items-center space-x-3'>
                                <li><PositionBadge text={person.position} size='sm'/></li>
                                <li><ProjectRoleBadge text={person.projectMemberAuth} size='sm'/></li>
                            </ul>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
