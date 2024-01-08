'use client';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { IoCreateOutline } from "@react-icons/all-files/io5/IoCreateOutline";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '@/store/CommonStateStore';

function RegisterNav() {
  const router = useRouter();
  const setSnackbar = useSetRecoilState(snackbarState);
  const [desktop, setDesktop] = useState(false);

  const goRegister = () => {
    const loginUser = getCookie("user_id");
    if (loginUser) {
      router.push("/register");
    } else {
      setSnackbar({ show: true, type: "INFO", content: "로그인 후 이용가능합니다." });
    }
  }

  const isWide = useMediaQuery({
    query: "(min-width: 361px)"
  });

  useEffect(() => {
    setDesktop(isWide);
  }, [setDesktop, isWide]);

  return (
    <div className='cursor-pointer' onClick={goRegister}>
      {
        desktop ? '새 글쓰기' : <IoCreateOutline className='h-6 w-6' />
      }
    </div>
  );
}

export default RegisterNav;