import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { techstackDropdownState } from "@/store/MainStateStore";
import TechStackImage from "@/components/ui/TechStackImage";

interface TechstackDropdownProps {
  onClick: () => void;
}

const TechstackDropdown = ({ onClick }: TechstackDropdownProps) => {
  const openTechstack = useRecoilValue(techstackDropdownState);

  const skills = [
    "프론트엔드",
    "백엔드",
    "IOS",
    "안드로이드",
    "기타",
    "모두보기",
  ];
  const [selectedCategory, setSelectedCategory] =
    useState<string>("프론트엔드");

  const handleSkillClick = (skill: string) => {
    setSelectedCategory(skill);
  };

  const techStacks = [
    { name: "Java", category: "백엔드" },
    { name: "JavaScript", category: "프론트엔드" },
    { name: "React", category: "프론트엔드" },
    { name: "Spring", category: "백엔드" },
    { name: "TypeScript", category: "프론트엔드" },
    { name: "Figma", category: "기타" },
    { name: "Vue", category: "프론트엔드" },
    { name: "Svelte", category: "프론트엔드" },
    { name: "Nextjs", category: "프론트엔드" },
    { name: "Kotlin", category: "안드로이드" },
    { name: "Nodejs", category: "백엔드" },
    { name: "Nestjs", category: "백엔드" },
    { name: "Express", category: "백엔드" },
    { name: "Mysql", category: "백엔드" },
    { name: "Mongodb", category: "백엔드" },
    { name: "Python", category: "백엔드" },
    { name: "Django", category: "백엔드" },
    { name: "Php", category: "백엔드" },
    { name: "Graphql", category: "백엔드" },
    { name: "Firebase", category: "백엔드" },
    { name: "ReactNative", category: ["IOS", "안드로이드"] },
    { name: "Unity", category: ["IOS", "안드로이드", "기타"] },
    { name: "Flutter", category: ["IOS", "안드로이드"] },
    { name: "Swift", category: "IOS" },
    { name: "Aws", category: "기타" },
    { name: "Kubernetes", category: "기타" },
    { name: "Docker", category: "기타" },
    { name: "Git", category: "기타" },
    { name: "Zeplin", category: "기타" },
    { name: "Jest", category: "기타" },
    { name: "C", category: "기타" },
  ];

  const filteredTechStacks = techStacks.filter((stack) => {
    if (selectedCategory === "모두보기") {
      return true;
    }
    if (Array.isArray(stack.category)) {
      return stack.category.includes(selectedCategory);
    }
    return stack.category === selectedCategory;
  });

  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);

  const handleTechStackClick = (stackName: string) => {
    setSelectedTechStacks((prevSelected) => {
      if (prevSelected.includes(stackName)) {
        return prevSelected.filter((name) => name !== stackName);
      } else {
        return [...prevSelected, stackName];
      }
    });
  };

  const handleTechStackRemove = (stackName: string) => {
    setSelectedTechStacks((prevSelected) =>
      prevSelected.filter((name) => name !== stackName)
    );
  };

  const resetSelection = () => {
    setSelectedTechStacks([]);
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!openTechstack) {
      setSelectedTechStacks([]);
    }
  }, [openTechstack]);

  return (
    <div className="relative" onClick={onClick}>
      <div className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
        <div className="text-lg text-grey800 mobile:text-sm">기술스택</div>
        <Image
          src="/images/bottomarrow.svg"
          alt="화살표버튼"
          width={15}
          height={8}
        />
      </div>
      {openTechstack && (
        <div className="absolute top-12" onClick={handleInnerClick}>
          <div className="py-3 px-5 flex flex-col w-[700px] h-[auto] mobile:w-[150px] mobile:h-[auto] border-2 rounded-3xl bg-white">
            <ul className="flex text-xl font-bold gap-6 border-b-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  onClick={() => handleSkillClick(skill)}
                  className={`cursor-pointer ${
                    skill === selectedCategory
                      ? "text-black100 border-b-2 border-black100 pb-4"
                      : "text-grey800"
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
            <ul className="flex mt-4 gap-2 flex-wrap">
              {filteredTechStacks.map((stack) => {
                const isActive =
                  selectedTechStacks.length === 0 ||
                  selectedTechStacks.includes(stack.name);
                return (
                  <li
                    key={stack.name}
                    onClick={() => handleTechStackClick(stack.name)}
                    className={`flex gap-2 items-center justify-center border-[1px] rounded-3xl py-1 px-2 border-grey400 cursor-pointer ${
                      isActive ? "opacity-1" : "opacity-30"
                    }`}
                  >
                    <Image
                      src={`/images/${stack.name.toLowerCase()}.svg`}
                      alt={stack.name}
                      width={30}
                      height={30}
                    />
                    <TechStackImage stackName={stack.name}/>
                    <span className="text-base">{stack.name}</span>
                  </li>
                );
              })}
            </ul>
            <ul className="flex mt-10 flex-wrap gap-y-1">
              {selectedTechStacks.map((selectedStackName) => {
                const stack = techStacks.find(
                  (stack) => stack.name === selectedStackName
                );
                return (
                  <li
                    key={selectedStackName}
                    className="flex gap-2 items-center justify-center py-1 px-2 cursor-pointer"
                    onClick={() => handleTechStackRemove(selectedStackName)}
                  >
                    {stack && (
                      <div className="flex gap-1 bg-grey300 rounded-xl py-1 px-2 font-bold">
                        <span className="text-xs">{stack.name}</span>
                        <Image
                          src={`/images/delete.svg`}
                          alt={stack.name}
                          width={18}
                          height={18}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
              {selectedTechStacks.length > 0 && (
                <div
                  onClick={resetSelection}
                  className="flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <Image
                    src="/images/initialize.svg"
                    alt="intialize"
                    width={15}
                    height={15}
                  />
                  <span className="text-base">초기화</span>
                </div>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechstackDropdown;
