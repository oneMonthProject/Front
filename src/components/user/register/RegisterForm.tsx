'use client';
import React, { useState } from "react";
import Input from "@/components/user/form/Input";
import PasswordInput from "@/components/user/form/PasswordInput";
import MultiSelect from "@/components/user/form/MultiSelect";
import { useRecoilValue } from "recoil";
import { positionState, interestStackState } from "@/store/UserStateStore";
import Select from "@/components/user/form/Select";
import TextArea from "@/components/user/form/TextArea";

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

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const position = useRecoilValue(positionState);
  const interestTechStack = useRecoilValue(interestStackState);
  const [selfIntroduction, setSelfInformation] = useState("");

  const register = () => {

  }

  const CheckNameButton: React.FC = () => {

    const checkDuplicateNickname = () => {

    }

    return (
      <button className={`rounded-lg ml-2 h-fit py-2 px-4 font-normal bg-primary text-white shadow-sm`}
        onClick={checkDuplicateNickname}>중복확인</button>
    );
  };

  return (
    <div className="space-y-4 mobile:space-y-3">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput id="passwordConfirmation" label="비밀번호 확인" placeholder="영문, 숫자 포함 6자 이상" required
        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <Input id="name" label="닉네임" placeholder="닉네임을 입력해주세요." required
        value={nickname} onChange={(e) => setNickname(e.target.value)} buttonComponent={<CheckNameButton />} />
      <Select recoilState={positionState} items={positionList} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect recoilState={interestStackState} items={techStackList} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="email" label="자기소개" placeholder="텍스트를 입력해주세요." rows={5} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfInformation(e.target.value)} />
      <button className="rounded-full w-full h-12 py-2 px-4 font-medium bg-primary text-white shadow-sm" onClick={register}>
        가입하기
      </button>
    </div>
  )
}

export default RegisterForm;