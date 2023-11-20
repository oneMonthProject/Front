'use client';
import React, {useState} from 'react';
import Pagination from 'react-js-pagination';


function NoticeListPagination() {
    const [activePage, setActivePage] = useState(1);

    function handlePageChange(pageNumber:number) {
        setActivePage(pageNumber);
    }


    return (
        <div  className='mt-12 mb-10'>
            <div className='customPagination'>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default NoticeListPagination;