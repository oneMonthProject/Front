import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AiTwotoneCalendar } from "@react-icons/all-files/ai/AiTwotoneCalendar";
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

export interface CalenderProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  date: string | null;
  setDate: (value: string) => void;
}

function CalendarInput({ id, label, required = false, date, setDate, ...props }: CalenderProps) {
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (date: Date | null) => {
    if (date) {
      setIsOpen(false);
      setDate(format(date, "yyyy-MM-dd"));
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative mobile:text-sm" ref={datePickerRef}>
      {
        label ? (
          <label htmlFor={id} className="text-gray-700">
            {label}
            {required ? <span className="text-red-500 required-dot ml-1.5 align-middle">*</span> : <></>}
          </label>
        ) : <></>
      }
      <input id={id} type="text" value={date ?? ""} readOnly
        className="mobile:text-sm block rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...props} />
      <button className="absolute right-2 bottom-3 text-gray-400" onClick={handleClick}>
        <AiTwotoneCalendar className="h-5 w-5" aria-hidden={true} />
      </button>
      {isOpen && (
        <div className="absolute z-50">
          <DatePicker selected={date ? new Date(date) : null} onChange={handleChange} inline />
        </div>
      )}
    </div>
  );
}

export default CalendarInput;