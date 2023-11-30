import React from "react";
import ProjectCard from "../projectCard/ProjectCard";

const MyProjectPosts = () => {
  return (
    <div className="grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-0 mobile:bg-grey200">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
};

export default MyProjectPosts;
