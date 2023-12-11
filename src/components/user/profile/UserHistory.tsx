'use client';
import React from "react";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BiUndo } from "@react-icons/all-files/bi/BiUndo";
import { BiCheck } from "@react-icons/all-files/bi/BiCheck";
import { BiX } from "@react-icons/all-files/bi/BiX";
import CommonPagination from "@/components/ui/CommonPagination";

const timeline = [
  {
    id: 1,
    status: "완료",
    target: '팀 프로젝트 매칭 서비스',
    href: '#',
    datetime: '2020-09-20'
  },
  {
    id: 2,
    status: "강제탈퇴",
    target: '팀 프로젝트 매칭 서비스',
    href: '#',
    datetime: '2020-09-22'
  },
  {
    id: 3,
    status: "탈퇴",
    target: '팀 프로젝트 매칭 서비스',
    href: '#',
    datetime: '2020-09-28'
  },
  {
    id: 4,
    status: "완료",
    target: '팀 프로젝트 매칭 서비스',
    href: '#',
    datetime: '2020-09-30'
  },
  {
    id: 5,
    status: "참여",
    target: '팀 프로젝트 매칭 서비스',
    href: '#',
    datetime: '2020-10-04'
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function UserHistory() {
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

  return (
    <div className="flow-root mx-2">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      getIconColorByStatus(event.status),
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    {getIconByStatus(event.status)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      <a href={event.href} className="font-medium text-gray-900">
                        {event.target}
                      </a>
                      {' '}{getHistoryStatusText(event.status)}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500 mobile:hidden">
                    <time dateTime={event.datetime}>{new Date(event.datetime).toDateString()}</time>
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