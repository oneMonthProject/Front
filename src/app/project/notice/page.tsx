import React from 'react';
import NoticeList from "@/components/notice/NoticeList";
import NoticeListPagination from "@/components/notice/NoticeListPagination";


function NoticePage() {
    return (
        <section className='tablet:basis-4/5'>
            <NoticeList/>
            <NoticeListPagination/>
        </section>
    );
}

export default NoticePage;