import UserGuide from "@/components/main/userGuide/UserGuide";
import PostTabMenu from "@/components/main/postTabMenu/PostTabMenu";
import React from "react";
import PostTabContents from "@/components/main/PostTabContents";

function HomePage() {
    return (
        <>
            <UserGuide/>
            <div className="mt-5 mobile:mt-2">
                <PostTabMenu/>
                <PostTabContents/>
            </div>
        </>
    );
}

export default HomePage;
