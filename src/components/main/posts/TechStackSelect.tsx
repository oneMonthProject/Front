import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";
import TechStackImage from "@/components/ui/TechStackImage";
import { selectedTechStackState } from "@/store/MainStateStore";

const categories = [
  "프론트엔드",
  "백엔드",
  "IOS",
  "안드로이드",
  "기타",
  "모두보기",
];

const techStacks = [
  { name: "Java", category: ["백엔드"] },
  { name: "JavaScript", category: ["프론트엔드"] },
  { name: "React", category: ["프론트엔드"] },
  { name: "Spring", category: ["백엔드"] },
  { name: "TypeScript", category: ["프론트엔드"] },
  { name: "Figma", category: ["기타"] },
  { name: "Vue", category: ["프론트엔드"] },
  { name: "Svelte", category: ["프론트엔드"] },
  { name: "Nextjs", category: ["프론트엔드"] },
  { name: "Kotlin", category: "안드로이드" },
  { name: "Nodejs", category: ["백엔드"] },
  { name: "Nestjs", category: ["백엔드"] },
  { name: "Express", category: ["백엔드"] },
  { name: "Mysql", category: ["백엔드"] },
  { name: "Mongodb", category: ["백엔드"] },
  { name: "Python", category: ["백엔드"] },
  { name: "Django", category: ["백엔드"] },
  { name: "Php", category: ["백엔드"] },
  { name: "Graphql", category: ["백엔드"] },
  { name: "Firebase", category: ["백엔드"] },
  { name: "ReactNative", category: ["IOS", "안드로이드"] },
  { name: "Unity", category: ["IOS", "안드로이드", "기타"] },
  { name: "Flutter", category: ["IOS", "안드로이드"] },
  { name: "Swift", category: ["IOS"] },
  { name: "Aws", category: ["기타"] },
  { name: "Kubernetes", category: ["기타"] },
  { name: "Docker", category: ["기타"] },
  { name: "Git", category: ["기타"] },
  { name: "Zeplin", category: ["기타"] },
  { name: "Jest", category: ["기타"] },
  { name: "C", category: ["기타"] },
];

const TechStackSelect = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedTechStacks, setSelectedTechStacks] = useRecoilState(selectedTechStackState);
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 700 });

  const filteredTechStacks = techStacks.filter((stack) => {
    if (selectedCategory === "모두보기" || isMobile) {
      return true;
    }

    if (Array.isArray(stack.category)) {
      return stack.category.includes(selectedCategory);
    }

    return false;
  });

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSkillClick = (skill: string) => {
    setSelectedCategory(skill);
  };

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

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile, isMobile]);

  return (
    <div className="absolute top-12" onClick={handleInnerClick}>
      <div className="py-3 px-5 flex flex-col w-[700px] mobile:w-[340px] border-2 rounded-3xl bg-white">
        <ul className="flex text-xl font-bold gap-6 border-b-2 mobile:hidden">
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <li
                key={category}
                onClick={() => handleSkillClick(category)}
                className={`cursor-pointer ${isActive ? "text-black100 border-b-2 border-black100 pb-4" : "text-grey800"}`}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <ul className="flex mt-4 gap-2 flex-wrap">
          {filteredTechStacks.map((stack) => {
            const isActive = selectedTechStacks.length === 0 || selectedTechStacks.includes(stack.name);
            return (
              <li
                key={stack.name}
                onClick={() => handleTechStackClick(stack.name)}
                className={`flex gap-2 items-center justify-center border-[1px] rounded-3xl py-1 px-2 border-grey400 cursor-pointer ${isActive ? "opacity-1" : "opacity-30"
                  }`}
              >
                <div className="mobile:hidden">
                  <TechStackImage stackName={stack.name} width={30} height={30} />
                </div>
                <span className="text-base">{stack.name}</span>
              </li>
            );
          })}
        </ul>
        <ul className="flex mt-6 flex-wrap gap-y-1 mobile:hidden">
          {techStacks.map((stack) => {
            const isActive = selectedTechStacks.includes(stack.name);
            return (
              <li
                key={stack.name}
                className={`flex gap-2 items-center justify-center py-1 px-2 cursor-pointer ${isActive ? "" : "hidden"}`}
                onClick={() => handleTechStackRemove(stack.name)}
              >
                {stack && (
                  <div className="flex gap-1 bg-grey300 rounded-xl py-1 px-2 font-bold">
                    <span className="text-xs self-center">{stack.name}</span>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_URL}/images/delete.svg`}
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
                src={`${process.env.NEXT_PUBLIC_URL}/images/initialize.svg`}
                alt="initialize"
                width={15}
                height={15}
              />
              <span className="text-base">초기화</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default TechStackSelect;