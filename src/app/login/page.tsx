import React from 'react';
import Link from "next/link";
import LoginForm from '@/components/user/login/LoginForm';

function LoginPage() {
  return (
    <div className="max-w-[380px] mobile:max-w-[300px] m-auto">
    <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center mb-10 mt-44 mobile:mt-32'>로그인</h1>
    <LoginForm />
    <div className="text-center text-sm mt-3 mb-10 mobile:hidden">
      이미 회원이신가요?
      <Link href='/register'>
        <span className="ml-1 underline text-blue-600">회원가입</span>
      </Link>
    </div>
  </div>
  );
}

export default LoginPage;