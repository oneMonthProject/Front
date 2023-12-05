'use client';
import React, { ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import { useRecoilState } from "recoil";
import { currentTaskFormState } from '@/store/project/task/TaskStateStore';
import Input from '@/components/ui/form/Input';
import Avatar from '@/components/ui/Avatar';
import CalendarInput from '@/components/ui/form/CalendarInput';
import Select from '@/components/ui/Select';
import PositionBadge from '@/components/ui/badge/PositionBadge';
import ToggleButton from '@/components/ui/ToggleButton';
import { SelectItem, UserInfo } from '@/utils/type';

const positionList = [
  { value: 1, name: '프론트엔드' },
  { value: 2, name: '백엔드' },
  { value: 3, name: '디자이너' },
  { value: 4, name: 'IOS' },
  { value: 5, name: '안드로이드' },
  { value: 6, name: '데브옵스' }
];

const testUserInfos = [
  { id: 1, nickname: "찐개발자1", imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", position: positionList[0] },
  { id: 2, nickname: "찐개발자2", imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", position: positionList[1] },
  { id: 3, nickname: "찐개발자3", position: positionList[3] },
  { id: 4, nickname: "찐개발자4", position: positionList[4] },
];

const convertToSelectItem = (user: UserInfo) => {
  if (user) {
    return { value: user.id, name: user.nickname };
  }

  return null;
}

const convertToUserInfo = (item: SelectItem) => {
  if (item) {
    return testUserInfos.find(userInfo => userInfo.id === item.value) as UserInfo;
  }

  return null;
}

function TaskModalContent() {
  const [currentForm, setCurrentForm] = useRecoilState(currentTaskFormState);
  const [assignee, setAssignee] = useState<SelectItem | null>(currentForm?.assignee ? convertToSelectItem(currentForm.assignee) : null);

  const getTestItems = () => {
    const items: SelectItem[] = [];
    if (testUserInfos.length > 0) {
      for (const user of testUserInfos) {
        const selectItem = convertToSelectItem(user);
        if (selectItem) {
          items.push(selectItem);
        }
      }
    }

    return items;
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentForm) {
      const updatedForm = { ...currentForm, content: event.target.value };
      setCurrentForm(updatedForm);
    }
  }

  const onToggleChange = (value: boolean) => {
    if (currentForm) {
      const updatedForm = { ...currentForm, isComplete: value };
      setCurrentForm(updatedForm);
    }
  }

  const onDateChange = (date: Date, target: 'startDate' | 'endDate') => {
    if (currentForm) {
      const updatedForm = { ...currentForm, [target]: date };
      setCurrentForm(updatedForm);
    }
  }

  const onSelectChange = (value: SelectItem) => {
    setAssignee(value);
    if (currentForm) {
      const updatedForm = { ...currentForm, assignee: convertToUserInfo(value) };
      setCurrentForm(updatedForm);
    }
  }

  return (
    <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
      <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
        <div className='flex'>
          <label htmlFor="content" className="text-gray-700 font-semibold self-center">내용</label>
          <div className='w-[350px] mobile:w-[220px] ml-auto'>
            <Input id="content" placeholder="내용을 입력해주세요."
              value={currentForm?.content} onChange={onInputChange} />
          </div>
        </div>
        {currentForm?.type === 'modify' && (
          <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">진행상황</label>
            <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto items-center'>
              <div className='pl-2 w-[60px]'>{currentForm.isComplete ? "완료" : "진행중"}</div>
              <ToggleButton enabled={currentForm.isComplete} setEnabled={onToggleChange} />
            </div>
          </div>
        )}
        <div className='flex'>
          <label className="text-gray-700 font-semibold self-center">기간</label>
          <div className='flex w-[350px] mobile:w-[220px] ml-auto'>
            <CalendarInput placeholder="선택" date={currentForm?.startDate || null} setDate={(date) => onDateChange(date, "startDate")} />
            <div className="text-gray-700 w-[20px] text-center self-center">~</div>
            <CalendarInput placeholder="선택" date={currentForm?.endDate || null} setDate={(date) => onDateChange(date, "endDate")} />
          </div>
        </div>
        <div className='flex'>
          <label htmlFor="content" className="text-gray-700 font-semibold self-center">담당</label>
          <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
            <Select value={assignee} setValue={onSelectChange} items={getTestItems()} placeholder="선택해주세요." />
          </div>
        </div>
        {
          currentForm?.assignee && (
            <div className='flex'>
              <div className="w-[350px] ml-auto divide-y divide-gray-100">
                <div className="flex items-center gap-x-6 py-2">
                  <Avatar size='2xs' src={currentForm.assignee.imageSrc} alt={`${currentForm.assignee.nickname}의 프로필 이미지`} />
                  <div className="min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4">
                    <p className="text-sm font-semibold leading-5 text-gray-900">{currentForm.assignee.nickname}</p>
                    <div className='flex items-center'>
                      <PositionBadge text={currentForm.assignee?.position?.name ?? ""} size='xs' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {currentForm?.type === 'modify' && (
          <div className='flex'>
            <label className="text-gray-700 font-semibold self-center">업데이트</label>
            <div className='flex w-[350px] mobile:w-[220px] h-[42px] mobile:h-[38px] space-x-3 ml-auto'>
              <div className='w-full pl-2 text-left self-center'>{`${currentForm?.updateUser}, ${currentForm?.updateDate ? format(currentForm.updateDate, "yyyy.MM.dd") : ""}`}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TaskModalContent;