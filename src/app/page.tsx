import PostTabMenu from "@/components/main/postTabMenu/PostTabMenu";
import React from "react";
import PostTabContents from "@/components/main/PostTabContents";
import UserGuide from "@/components/main/userGuide/UserGuide";

function HomePage() {
    return (
        <>
            <aside>
                <UserGuide/>
            </aside>
            <main className="mt-10 mobile:mt-2">
                <PostTabMenu/>
                <PostTabContents/>
            </main>
        </>
    );
}

export default HomePage;
