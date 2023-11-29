import React from 'react';
import Link from "next/link";
import LoginForm from '@/components/user/login/LoginForm';

function LoginPage() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center mb-10'>로그인</h1>
      <LoginForm />
      <div className="text-center text-sm mobile:text-xs mt-3">
        이미 회원이신가요?
        <Link href='/signup'>
          <span className="ml-1 underline text-blue-600">회원가입</span>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;