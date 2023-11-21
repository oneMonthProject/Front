import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/user/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="max-w-[380px] mobile:max-w-[300px] m-auto">
      <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center my-8 mobile:my-4'>회원가입</h1>
      <RegisterForm />
      <div className="text-center text-sm mobile:text-xs mt-2 mb-10">
        이미 회원이신가요?
        <Link href='/login'>
          <span className="ml-1 underline text-blue-600">로그인</span>
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage;