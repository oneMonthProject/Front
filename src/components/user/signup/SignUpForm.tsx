'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/form/Input";
import PasswordInput from "@/components/ui/form/PasswordInput";
import TextArea from "@/components/ui/form/TextArea";
import FormButton from "@/components/ui/form/FormButton";
import NicknameField from "@/components/ui/form/NickNameField";
import { SelectItem } from "@/utils/type";
import { SignUpRequest, signUp } from "@/service/signup";

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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [position, setPosition] = useState<SelectItem | null>(null);
  const [techStack, setTechStack] = useState<SelectItem[]>([]);
  const [selfIntroduction, setSelfIntroduction] = useState("");

  const isValid = () => {
    // 빈칸 및 형식 확인 로직 추가
    // password 와 passwordConfirmation 같은 지 비교 로직도 추가
    return true;
  }

  const getSelectItemValue = (item: SelectItem | null) => {
    if (item) {
      return item.value;
    }

    return item;
  }

  const userSignUp = () => {
    if (!isValid()) {
      return;
    }

    const positionId = getSelectItemValue(position);
    const techStackIds = techStack.map(stack => getSelectItemValue(stack));

    const signUpRequest = { email, password, nickname, positionId, techStackIds, intro: selfIntroduction } as SignUpRequest;
    signUp(signUpRequest).then(response => {
      if (response) {
        router.push("/");
      }
    }).catch(error => {
      // error 표시
    });
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
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={userSignUp}>가입</FormButton>
    </div>
  )
}

export default SignUpForm;