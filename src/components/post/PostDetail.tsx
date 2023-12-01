import React from "react";
import TitleSection from "./titleSection/TitleSection";
import InfoSection from "./infoSection/InfoSection";
import BodySection from "./bodySection/BodySection";
import ButtonSection from "./buttonSection/ButtonSection";

const PostDetail = () => {
  return (
    <div className="p-5 mobile:p-1 m-auto">
      <TitleSection />
      <InfoSection />
      <BodySection />
      <ButtonSection />
    </div>
  );
};

export default PostDetail;
