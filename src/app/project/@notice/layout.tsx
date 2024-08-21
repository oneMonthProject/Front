import React, {ReactNode} from 'react';
import NoticeNavTab from "@/components/project/alert/NoticeNavTab";

function NoticeLayout({children}:{children:ReactNode}) {
    return (
        <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
            <NoticeNavTab/>
            {children}
        </section>
    );
}

export default NoticeLayout;