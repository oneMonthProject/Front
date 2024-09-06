import React from 'react';
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Select from "@/components/ui/selector/Select";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";

function ProjectSettingCrew() {

    const people = [
        {id: "1a", name: "test123", position: "프론트엔드", auth: {name: "매니저", value: 1}},
        {id: "2a", name: "test345", position: "백엔드", auth: {name: "크루", value: 2}},
        {id: "3a", name: "user123", position: "안드로이드", auth: {name: "크루", value: 2}},
        {id: "4a", name: "user123", position: "디자이너", auth: {name: "크루", value: 2}},
        {id: "5a", name: "user123", position: "프론트엔드", auth: {name: "매니저", value: 1}},
        {id: "6a", name: "user123", position: "백엔드", auth: {name: "크루", value: 2}},
    ];

    return (
        <SettingContainer>
            <SettingTitle>크루 권한</SettingTitle>
            <div className="mx-auto mt-8 flow-root">
                <div className="-ml-4 -my-2 overflow-x-auto sm:-ml-6 lg:-ml-12">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                                <tr key={person.id}>
                                    <td className="tablet:w-[40%] mobile:w-[20%] whitespace-nowrap py-5 pl-4 pr-3 text-base">
                                        <div className=" flex items-center">
                                            <div className="h-11 w-11 flex-shrink-0 mobile:hidden">
                                                <Avatar alt="크루 프로필 이미지" size='xs' src={null}/>
                                            </div>
                                            <div className="ml-4 mobile:ml-0">
                                                <div className="font-medium text-gray-900">{person.name}</div>
                                            </div>
                                            <div className="ml-3 mobile:ml-2">
                                                <PositionBadge text={person.position} size='sm'/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="max-w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                        <div className=" flex items-center">

                                            <div className='w-[230px] mobile:w-[95px]'>
                                                <Select
                                                    items={[{name: '매니저', value: 1}, {name: '크루', value: 2}]}
                                                    setValue={() => {
                                                    }}
                                                    value={person.auth}
                                                />
                                            </div>
                                        </div>

                                    </td>
                                    <td className="max-w-[30%] relative whitespace-nowrap py-5 pl-3 pr-4 tablet:text-right text-sm font-medium sm:pr-0">
                                        <div className='w-[100px] mobile:w-[80px]'>
                                            <Button theme='primary'>
                                                저장
                                                <span className='sr-only'>, 이름</span>
                                            </Button>
                                        </div>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SettingContainer>
    );
}

export default ProjectSettingCrew;