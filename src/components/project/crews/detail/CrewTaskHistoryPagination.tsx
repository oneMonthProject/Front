'use client';
import React, {useState} from 'react';
import Pagination from "react-js-pagination";

function CrewTaskHistoryPagination() {
    const [activePage, setActivePage] = useState(1);

    function handlePageChange(pageNumber:number) {
        setActivePage(pageNumber);
    }


    return (
        <div className='mt-6 mb-10 mobile:max-w-[100px] mobile:mx-auto'>
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

export default CrewTaskHistoryPagination;