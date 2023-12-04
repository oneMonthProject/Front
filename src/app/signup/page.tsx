import React from "react";
import Link from "next/link";
import SignUpForm from "@/components/user/signup/SignInForm";

function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h1 className='text-3xl mobile:text-2xl font-semibold w-full text-center mb-4 mobile:mb-2'>회원가입</h1>
      <SignUpForm />
      <div className="text-center text-sm mobile:text-xs mt-2">
        이미 회원이신가요?
        <Link href='/login'>
          <span className="ml-1 underline text-blue-600">로그인</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage;