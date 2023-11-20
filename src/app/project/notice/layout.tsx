import React, {ReactNode} from 'react';
import NoticeNavTab from "@/components/notice/NoticeNavTab";

function NoticeLayout({children}:{children:ReactNode}) {
    return (
        <section className='tablet:flex'>
            <NoticeNavTab/>
            {children}
        </section>
    );
}

export default NoticeLayout;