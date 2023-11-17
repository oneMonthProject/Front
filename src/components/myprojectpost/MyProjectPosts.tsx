import React from "react";
import ProjectCard from "../projectcard/ProjectCard";

const MyProjectPosts = () => {
  return (
    <div className="grid pc:grid-cols-4 tablet:grid-cols-2 mt-10 gap-10 mobile:grid-cols-1 mobile:bg-grey200 mobile:gap-5">
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
