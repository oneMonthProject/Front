import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedPositionState } from "@/store/MainStateStore";
import Search from "./Search";
import PostCard from "../postCard/PostCard";
import PositionDropdown from "./PositionDropdown";
import TechStackDropdown from "./TechStackDropdown";

const positions = [
  { value: "frontend", name: "프론트엔드" },
  { value: "backend", name: "백엔드" },
  { value: "designer", name: "디자이너" },
  { value: "ios", name: "IOS" },
  { value: "android", name: "안드로이드" },
  { value: "devOps", name: "데브옵스" },
];

const techStackList = [
  { value: 1, name: 'React' },
  { value: 2, name: 'TypeScript' },
  { value: 3, name: 'JavaScript' },
  { value: 4, name: 'Vue' },
  { value: 5, name: 'Nextjs' },
  { value: 6, name: 'Node.js' },
  { value: 7, name: 'Java' },
  { value: 8, name: 'Spring' },
  { value: 9, name: 'Kotlin' },
  { value: 10, name: 'Nestjs' },
  { value: 11, name: 'Swift' },
  { value: 12, name: 'Flutter' },
  { value: 13, name: 'Figma' },
];

const testProjectInfo = [
  {
    id: 1,
    title: "FE, BE 모집합니다",
    projectName: "trustcrews",
    projectSubject: "팀프로젝트 매칭 서비스 개발",
    trustGrade: "1등급",
    recruitmentCount: 5,
    startDate: new Date("2023-12-05"),
    endDate: new Date("2023-01-05"),
    positions: [positions[0], positions[1]],
    techStacks: [techStackList[0], techStackList[1], techStackList[3], techStackList[5]],
    contact: "010-XXXX-XXXX",
    userInfo: {
      nickname: "찐개발자",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 2,
    title: "FE, BE 모집합니다",
    projectName: "trustcrews",
    projectSubject: "팀프로젝트 매칭 서비스 개발",
    trustGrade: "1등급",
    recruitmentCount: 5,
    startDate: new Date("2023-12-05"),
    endDate: new Date("2023-01-05"),
    positions: [positions[0], positions[1]],
    techStacks: [techStackList[0], techStackList[1], techStackList[3], techStackList[5]],
    contact: "010-XXXX-XXXX",
    userInfo: {
      nickname: "찐개발자",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  },
  {
    id: 3,
    title: "FE, BE 모집합니다",
    projectName: "trustcrews",
    projectSubject: "팀프로젝트 매칭 서비스 개발",
    trustGrade: "1등급",
    recruitmentCount: 5,
    startDate: new Date("2023-12-05"),
    endDate: new Date("2023-01-05"),
    positions: [positions[0], positions[1]],
    techStacks: [techStackList[0], techStackList[1], techStackList[3], techStackList[5]],
    contact: "010-XXXX-XXXX",
    userInfo: {
      nickname: "찐개발자",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  }
]

const Posts = () => {
  const selectedPosition = useRecoilValue(selectedPositionState);
  const setSelectedPosition = useSetRecoilState(selectedPositionState);
  return (
    <div className="flex-col">
      <div className="mt-6 flex justify-between mobile:block mobile:space-y-2 mobile:mt-2">
        <div className="flex space-x-5 mobile:space-x-2">
          <TechStackDropdown />
          <PositionDropdown items={positions} value={selectedPosition} setValue={setSelectedPosition} />
        </div>
        <Search />
      </div>
      <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-6 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
        {testProjectInfo.length > 0 && testProjectInfo.map((info) => (
          <PostCard key={info.id} postInfo={info} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
