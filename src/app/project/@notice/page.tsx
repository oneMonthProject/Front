import React from 'react';
import NoticeList from "@/components/project/notice/NoticeList";
import NoticeModal from "@/components/project/notice/NoticeModal";


function NoticePage() {
    return (
        <section className='tablet:basis-4/5'>
            <NoticeList/>
            <NoticeModal/>
        </section>
    );
}

export default NoticePage;