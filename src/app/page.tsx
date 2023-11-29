import ImageSlider from "@/components/ui/ImageSlider";
import PostTabMenu from "@/components/main/postTabMenu/PostTabMenu";
import React from "react";
import PostTabContents from "@/components/main/PostTabContents";

function HomePage() {
    return (
        <>
            <ImageSlider/>
            <div className="mt-5 mobile:mt-2">
                <PostTabMenu/>
                <PostTabContents/>
            </div>
        </>
    );
}

export default HomePage;
