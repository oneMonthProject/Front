'use client';
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function NicknameField({ disabled = false, required = false, ...props }: InputProps) {

  const checkDuplicateNickname = () => {

  }

  return (
    <div className={classNames(disabled ? 'opacity-50 pointer-events-none' : '', 'relative mobile:text-sm')}>
      <label htmlFor="nickname" className="text-gray-700">
        닉네임
        {required ? <span className="text-red-500 required-dot ml-1.5 align-middle">*</span> : <></>}
      </label>
      <div className="flex">
        <input id="nickname" type="text"
          className="mobile:text-sm rounded-lg border-1 flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          {...props} />
        <button className={`rounded-lg ml-2 h-fit py-2 px-4 font-normal bg-primary text-white shadow-sm`}
          onClick={checkDuplicateNickname}>중복확인</button>
      </div>
    </div>

  );
}

export default NicknameField;