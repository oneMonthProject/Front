'use client';
import React, {useState} from 'react';
import Pagination from 'react-js-pagination';

function PaginationEl() {
    const [activePage, setActivePage] = useState(1);

    function handlePageChange(pageNumber:number) {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    }


    return (
        <div className='customPagination'>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default PaginationEl;