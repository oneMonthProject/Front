import ImageSlider from "@/components/ui/ImageSlider";
import Search from "@/components/main/posts/Search";
import PostTabMenu from "@/components/main/postTabMenu/PostTabMenu";
import React from "react";
import PostTabContents from "@/components/main/PostTabContents";

function HomePage() {
    return (
        <>
            <ImageSlider/>
            <div className="mt-10">
                <Search/>
                <PostTabMenu/>
                <PostTabContents/>
            </div>
        </>
    );
}

export default HomePage;
