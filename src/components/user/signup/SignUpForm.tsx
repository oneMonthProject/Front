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
import { getSelectItemValue } from "@/utils/common";

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

  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isValidNickname = (nickname: string) => {
    const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
    return nicknameRegex.test(nickname);
  }

  const isValidPassword = (password: string) => {
    const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z!@#$%^&*(),.?":{}|<>]{6,12}$/;
    return passwordRegex.test(password);
  }

  const isValid = () => {
    // 값이 비어있을 경우
    if (email === "" || nickname === "" || password === "" || passwordConfirmation === "" ||
      !position || techStack.length === 0) {
      // Snackbar 추가
      console.log("필수값들을 입력 또는 선택해주세요.");

      return false;
    }

    // 이메일 형식 아닐 경우
    if (!isValidEmail(email)) {
      // Snackbar 추가
      console.log("이메일 형식이 아닙니다.");
      return false;
    }

    // 비밀번호 형식이 맞지 않는 경우
    if (!isValidPassword(password)) {
      // Snackbar 추가
      console.log("비밀번호는 영어와 특수문자를 포함하고, 6~12 자리만 가능합니다.");
      return false;
    }

    // 비밀번호와 비밀번호 확인이 다를 경우
    if (password !== passwordConfirmation) {
      // Snackbar 추가
      console.log("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    }

    // 닉네임 형식이 맞지 않는 경우
    if (!isValidNickname(nickname)) {
      // Snackbar 추가
      console.log("닉네임은 영어 숫자 포함 6~10 자리만 가능합니다.");
      return false;
    }

    // 닉네임 중복 확인 하지 않았을 경우
    if (!isCheckedNickname) {
      // Snackbar 추가
      console.log("닉네임 중복확인을 해주세요.");
      return false;
    }

    return true;
  }

  const userSignUp = () => {
    if (!isValid()) {
      return;
    }

    const positionId = getSelectItemValue(position);
    const techStackIds = techStack.map(stack => getSelectItemValue(stack));

    const signUpRequest = { email, password, nickname, positionId, techStackIds, intro: selfIntroduction } as SignUpRequest;
    signUp(signUpRequest).then(response => {
      const { result } = response;
      if (result === "success") {
        router.push("/");
      }
    }).catch(error => {
      // error 표시
    });
  }

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(false);
  }

  return (
    <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput id="passwordConfirmation" label="비밀번호 확인" placeholder="영문, 숫자 포함 6자 이상" required
        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <NicknameField placeholder="닉네임을 입력해주세요." setCheck={setIsCheckedNickname} required
        value={nickname} onChange={onChangeNickname} />
      <Select value={position} setValue={setPosition} items={positionList} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect values={techStack} setValues={setTechStack} items={techStackList} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={userSignUp}>가입</FormButton>
    </div>
  )
}

export default SignUpForm;