'use client';
import React, {useState} from 'react';
import Pagination from "react-js-pagination";

interface CommonPaginationProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed: number;
    onChangePageHandler: (pageNumber: number) => void;
}

function CommonPagination({
                              activePage,
                              itemsCountPerPage,
                              totalItemsCount,
                              pageRangeDisplayed,
                              onChangePageHandler
                          }: CommonPaginationProps) {
    return (
        <div className='mt-12 mb-10 mobile:max-w-[100px] mobile:mx-auto'>
            <div className='customPagination'>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={onChangePageHandler}
                />
            </div>
        </div>
    );
}

export default CommonPagination;