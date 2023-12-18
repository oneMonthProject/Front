'use client';
import React, { useState } from "react";
import Link from "next/link";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BiUndo } from "@react-icons/all-files/bi/BiUndo";
import { BiCheck } from "@react-icons/all-files/bi/BiCheck";
import { BiX } from "@react-icons/all-files/bi/BiX";
import CommonPagination from "@/components/ui/CommonPagination";
import { useUserProjectHistory } from "@/hooks/useUserProjectHistory";
import { classNames } from "@/utils/common";

function UserHistory() {
  // 상의하고 CommonPagination 에 연결
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, error } = useUserProjectHistory(pageNumber);

  // Loading 시 Skeleton 추가
  // Error 시 Snackbar 추가
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  
  const getIconColorByStatus = (status: string) => {
    switch (status) {
      case "참여":
        return 'bg-blue-500'
      case "완료":
        return 'bg-green-500'
      case "탈퇴":
        return 'bg-gray-400'
      case "강제탈퇴":
        return 'bg-red-400'
      default:
        return ''
    }
  }

  const getIconByStatus = (status: string) => {
    const iconClassName = 'h-5 w-5 text-white';

    switch (status) {
      case "참여":
        return <BiUser className={iconClassName} aria-hidden="true" />
      case "완료":
        return <BiCheck className={iconClassName} aria-hidden="true" />
      case "탈퇴":
        return <BiUndo className={iconClassName} aria-hidden="true" />
      case "강제탈퇴":
        return <BiX className={iconClassName} aria-hidden="true" />
      default:
        return <></>
    }
  }

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case "참여":
        return "프로젝트에 참여 하였습니다."
      case "완료":
        return "프로젝트를 완료 하였습니다."
      case "탈퇴":
        return "프로젝트를 탈퇴 하셨습니다."
      case "강제탈퇴":
        return "프로젝트에서 강제탈퇴 당하셨습니다."
      default:
        return ""
    }
  }

  const histories = data!.data;
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
        <CommonPagination />
      </ul>
    </div>
  )
}

export default UserHistory;