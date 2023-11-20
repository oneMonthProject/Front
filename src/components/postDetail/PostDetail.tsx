import React from "react";
import TitleSection from "./titleSection/TitleSection";
import InfoSection from "./infoSection/InfoSection";
import BodySection from "./bodySection/BodySection";
import ButtonSection from "./buttonSection/ButtonSection";

const PostDetail = () => {
  return (
    <div className="p-5 max-w-[900px] m-auto mt-20">
      <TitleSection />
      <InfoSection />
      <BodySection />
      <ButtonSection />
    </div>
  );
};

export default PostDetail;
