import React, {useState} from 'react';
import {useRecoilValueLoadable} from "recoil";
import NoItemsContent from "@/components/project/alert/NoItemsContent";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";
import {projectTaskAuthSelector} from "@/store/project/ProjectInfoStateStore";
import CommonPagination from "@/components/ui/CommonPagination";
import {ITEM_COUNT, PAGE_RANGE} from "@/utils/constant";
import TaskAlertListItem from "@/components/project/alert/task/list/TaskAlertListItem";
import useAlertList from "@/hooks/useAlertList";
import {AlertType} from "@/service/project/alert/constant";
import AlertListLoader from "@/components/project/alert/AlertListLoader";
import {Notice} from "@/app/project/@notice/_utils/type";


function TaskAlertList() {
    const [pageIndex, setPageIndex] = useState(0);
    const {isFetching:isFetchingList, alertList, totalItemsCount} = useAlertList(pageIndex, AlertType.PRA3001);
    const {
        state: authState,
        contents: authContents
    } = useRecoilValueLoadable<ResponseBody<ProjectAuthMap | null>>(
        projectTaskAuthSelector(null)
    );

    const isFetching = authState === 'loading' || isFetchingList;
    if (isFetching) return <AlertListLoader/>;

    return (
        <>
            <div className='alertList'>
                {
                    totalItemsCount > 0
                        ? (
                            <ul role="list">
                                {alertList.map((item) =>
                                    <TaskAlertListItem
                                        key={item.alertId}
                                        data={item as Notice}
                                        isAuthorized={authContents.data.milestoneAuth}
                                    />
                                )}
                            </ul>
                        )
                        : (
                            <NoItemsContent/>
                        )
                }
            </div>
            <CommonPagination
                activePage={pageIndex + 1}
                itemsCountPerPage={ITEM_COUNT.LIST_SM}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                onChangePageHandler={(pageIndex: number) => setPageIndex(pageIndex - 1)}
            />
        </>
    );
}

export default TaskAlertList;