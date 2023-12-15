'use client';
import React, { useState } from "react";
import Input from "@/components/ui/form/Input";
import PasswordInput from "@/components/ui/form/PasswordInput";
import FormButton from "@/components/ui/form/FormButton";
import { login } from "@/service/login";
import { setCookie } from "cookies-next";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = () => {
    // 빈칸 및 형식 확인 로직 추가
    return true;
  }

  const userLogin = () => {
    if (!isValid()) {
      return;
    }

    login(email, password)
      .then((response) => {
        console.log("response", response);

        // user 정보는 localStorage 에 담는 것도 고려해보기
        // setCookie("user_id", response.userId);
        // setCookie("email", response.email);
        // setCookie("nickname", response.nickname);
        // Refresh token 은 서버에서 Set-Cookie 로 보내주면 같은 도메인 내의 요청에는 자동으로 들어가진다고 함. 테스트 필요
      })
  }

  return (
    <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-4">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <FormButton onClick={userLogin}>로그인</FormButton>
    </div>
  )
}

export default LoginForm;