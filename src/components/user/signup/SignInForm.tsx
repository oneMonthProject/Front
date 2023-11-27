'use client';
import React, { useState } from "react";
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Input from "@/components/user/form/Input";
import PasswordInput from "@/components/user/form/PasswordInput";
import TextArea from "@/components/user/form/TextArea";
import FormButton from "@/components/user/form/FormButton";
import NicknameField from "@/components/user/form/NickNameField";
import { SelectItem } from "@/utils/type";

const positionList = [
  { value: 1, name: '프론트엔드' },
  { value: 2, name: '백엔드' },
  { value: 3, name: '디자이너' },
  { value: 4, name: 'IOS' },
  { value: 5, name: '안드로이드' },
  { value: 6, name: '데브옵스' }
];

const techStackList = [
  { value: 1, name: 'React' },
  { value: 2, name: 'TypeScript' },
  { value: 3, name: 'JavaScript' },
  { value: 4, name: 'Vue' },
  { value: 5, name: 'Nextjs' },
  { value: 6, name: 'Node.js' },
  { value: 7, name: 'Java' },
  { value: 8, name: 'Spring' },
  { value: 9, name: 'Kotlin' },
  { value: 10, name: 'Nestjs' },
  { value: 11, name: 'Swift' },
  { value: 12, name: 'Flutter' },
  { value: 13, name: 'Figma' },
];

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [position, setPosition] = useState<SelectItem | null>(null);
  const [techStack, setTechStack] = useState<SelectItem[]>([]);
  const [selfIntroduction, setSelfInformation] = useState("");

  const signUp = () => {

  }

  return (
    <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput id="passwordConfirmation" label="비밀번호 확인" placeholder="영문, 숫자 포함 6자 이상" required
        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <NicknameField placeholder="닉네임을 입력해주세요." required value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <Select value={position} setValue={setPosition} items={positionList} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect values={techStack} setValues={setTechStack} items={techStackList} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfInformation(e.target.value)} />
      <FormButton onClick={signUp}>가입</FormButton>
    </div>
  )
}

export default SignUpForm;