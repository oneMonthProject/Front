import React from 'react';
import {NoticeItemProp} from "@/utils/type";
import NoticeBadge from "@/components/ui/NoticeBadge";

function NoticeItem({item:{alertId, type, content, createDate}}:{item:NoticeItemProp}) {
    return (
        <li
            key={alertId}
            className="flex items-center gap-x-10 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer"
            onClick={(e) => console.log("clm target: ",e.target)}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge size='sm' text={type}/>
                {content}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default NoticeItem;