'use client';
import { InputHTMLAttributes, useState } from "react";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineEyeInvisible } from "@react-icons/all-files/ai/AiOutlineEyeInvisible";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

function PasswordInput({ id, label, required = false, ...props }: InputProps) {
  const [visible, setVisible] = useState(false);

  const getButtonIcon = (passwordVisible: boolean) => {
    const iconProps = { className: "h-5 w-6", ["aria-hidden"]: true };
    return passwordVisible ? <AiOutlineEyeInvisible {...iconProps} /> : <AiOutlineEye {...iconProps} />;
  }

  return (
    <div className="relative mobile:text-sm">
      {
        label ? (
          <label htmlFor={id} className="text-gray-700">
            {label}
            {required ? <span className="text-red-500 required-dot ml-1.5 align-middle">*</span> : <></>}
          </label>
        ) : <></>
      }
      <input id={id} type={visible ? "text" : "password"}
        className="mobile:text-sm block rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...props} />
      <button className="absolute right-2 bottom-3 text-gray-400" onClick={() => setVisible(!visible)}>
        {getButtonIcon(visible)}
      </button>
    </div>
  );
}

export default PasswordInput;