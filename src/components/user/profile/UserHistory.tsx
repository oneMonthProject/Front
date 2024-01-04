'use client';
import React, { useState } from "react";
import Link from "next/link";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BiUndo } from "@react-icons/all-files/bi/BiUndo";
import { BiCheck } from "@react-icons/all-files/bi/BiCheck";
import { BiX } from "@react-icons/all-files/bi/BiX";
import CommonPagination from "@/components/ui/CommonPagination";
import { getUserProjectHistory } from "@/service/user";
import { classNames } from "@/utils/common";
import { ProjectHistoryStatus, ResponseBody, UserProjectHistory } from "@/utils/type";
import { useSuspenseQuery } from "@tanstack/react-query";

function UserHistory() {
  const [pageNumber, setPageNumber] = useState(0);
  const { data } = useSuspenseQuery<ResponseBody<UserProjectHistory[]>, Error>({
    queryKey: ['profileInfo', pageNumber],
    queryFn: () => getUserProjectHistory(pageNumber)
  });

  const { data: histories } = data;
  
  const getIconColorByStatus = (status: ProjectHistoryStatus) => {
    switch (status) {
      case "PARTICIPATING":
        return 'bg-blue-500'
      case "FINISH":
        return 'bg-green-500'
      case "WITHDRAWAL":
        return 'bg-gray-400'
      case "FORCED_WITHDRAWAL":
        return 'bg-red-400'
      default:
        return ''
    }
  }

  const getIconByStatus = (status: ProjectHistoryStatus) => {
    const iconClassName = 'h-5 w-5 text-white';

    switch (status) {
      case "PARTICIPATING":
        return <BiUser className={iconClassName} aria-hidden="true" />
      case "FINISH":
        return <BiCheck className={iconClassName} aria-hidden="true" />
      case "WITHDRAWAL":
        return <BiUndo className={iconClassName} aria-hidden="true" />
      case "FORCED_WITHDRAWAL":
        return <BiX className={iconClassName} aria-hidden="true" />
      default:
        return <></>
    }
  }

  const getHistoryStatusText = (status: ProjectHistoryStatus) => {
    switch (status) {
      case "PARTICIPATING":
        return "프로젝트에 참여 하였습니다."
      case "FINISH":
        return "프로젝트를 완료 하였습니다."
      case "WITHDRAWAL":
        return "프로젝트를 탈퇴 하셨습니다."
      case "FORCED_WITHDRAWAL":
        return "프로젝트에서 강제탈퇴 당하셨습니다."
      default:
        return ""
    }
  }

  return (
    <div className="flow-root mx-2">
      <ul role="list" className="-mb-8">
        {histories.map((history, idx) => (
          <li key={history.userProjectHistoryId}>
            <div className="relative pb-8">
              {idx !== histories.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      getIconColorByStatus(history.status),
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    {getIconByStatus(history.status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <Link href={`/project?projectId=${history.userProjectHistoryId}`} className="font-medium text-gray-900">
                        {history.projectName}
                      </Link>
                      {' '}{getHistoryStatusText(history.status)}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500 mobile:hidden">
                    <time dateTime={history.updateDate}>{new Date(history.updateDate).toDateString()}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
        {/*<CommonPagination />*/}
      </ul>
    </div>
  )
}

export default UserHistory;