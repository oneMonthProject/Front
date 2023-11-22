'use client';
import React, { useState } from "react";
import Input from "@/components/user/form/Input";
import PasswordInput from "@/components/user/form/PasswordInput";
import FormButton from "@/components/user/form/FormButton";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

  }

  return (
    <div className="space-y-5 mobile:space-y-4">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <FormButton onClick={login}>로그인</FormButton>
    </div>
  )
}

export default LoginForm;