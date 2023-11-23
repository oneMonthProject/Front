import React from 'react';
import NoticeList from "@/components/project/notice/NoticeList";
import NoticeListPagination from "@/components/project/notice/NoticeListPagination";
import NoticeModal from "@/components/project/notice/NoticeModal";


function NoticePage() {
    return (
        <section className='tablet:basis-4/5'>
            <NoticeList/>
            <NoticeListPagination/>
            <NoticeModal/>
        </section>
    );
}

export default NoticePage;