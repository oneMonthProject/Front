import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/user/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="max-w-[340px] m-auto">
      <h1 className='text-3xl font-semibold w-full text-center my-8'>회원가입</h1>
      <RegisterForm />
      <div className="text-center text-sm mt-1.5 mb-10">
        이미 회원이신가요?
        <Link href='/login'>
          <span className="ml-1 underline text-blue-600">로그인 하기</span>
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage;