'use client';
import React, { useState } from "react";
import { FaArrowAltCircleRight } from "@react-icons/all-files/fa/FaArrowAltCircleRight";
import { FaMinusSquare } from "@react-icons/all-files/fa/FaMinusSquare";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaExclamationTriangle } from "@react-icons/all-files/fa/FaExclamationTriangle";
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle";

class TestUserHistory {
  status: string;
  projectName: string;
  updateDate: string;

  constructor(status: string, projectName: string, updateDate: string) {
    this.status = status;
    this.projectName = projectName;
    this.updateDate = updateDate;
  }
}

const testHistoryList = [
  new TestUserHistory("완료", "프로젝트 F", "2023-12-01"),
  new TestUserHistory("강제탈퇴", "프로젝트 D", "2023-12-01"),
  new TestUserHistory("탈퇴", "프로젝트 C", "2023-12-01"),
  new TestUserHistory("완료", "프로젝트 B", "2023-12-01"),
  new TestUserHistory("참여", "프로젝트 A", "2023-12-01")
];

function UserHistory() {
  const [historyList, setHistoryList] = useState<TestUserHistory[]>(testHistoryList);

  const getIconByStatus = (status: string) => {
    const iconClassName = 'h-8 w-8 mobile:h-5 mobile:w-5';

    switch (status) {
      case "참여":
        return <FaArrowAltCircleRight className={`${iconClassName} text-blue-500`} />
      case "완료":
        return <FaCheckCircle className={`${iconClassName} text-green-500`} />
      case "탈퇴":
        return <FaMinusSquare className={`${iconClassName} text-red-500`} />
      case "강제탈퇴":
        return <FaExclamationTriangle className={`${iconClassName} text-black-500`} />
      default:
        return <FaQuestionCircle className={iconClassName} />
    }
  }

  const getHistoryStatusText = (status: string) => {
    switch (status) {
      case "참여":
        return " 프로젝트에 참여하였습니다."
      case "완료":
        return " 프로젝트 완료 하였습니다."
      case "탈퇴":
        return " 프로젝트를 탈퇴 하셨습니다."
      case "강제탈퇴":
        return " 프로젝트에서 강제 탈퇴 당했습니다."
      default:
        return "알 수 없는 상테 입니다."
    }
  }

  return (
    <div className="space-y-4 mobile:space-y-2 w-full h-fit text-center justify-center mt-8 mobile:mt-5 p-5 mobile:p-0">
      {
        historyList.length > 0 ? historyList.map(history => (
          <div key={history.projectName} className="flex text-lg mobile:text-xs">
            <span className="items-center self-center p-3 mobile:p-1">{getIconByStatus(history.status)}</span>
            <span className="text-left items-center self-center">
              <span className="font-bold">{history.projectName}</span>
              <span className="text-gray-500">{getHistoryStatusText(history.status)}</span>
            </span>
            <span className="items-center self-center ml-auto text-gray-400 mobile:hidden">{history.updateDate}</span>
          </div>
        )) : <></>
      }
    </div>
  )
}

export default UserHistory;