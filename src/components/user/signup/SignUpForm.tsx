'use client';
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Input from "@/components/ui/form/Input";
import PasswordInput from "@/components/ui/form/PasswordInput";
import TextArea from "@/components/ui/form/TextArea";
import FormButton from "@/components/ui/form/FormButton";
import NicknameField from "@/components/ui/form/NickNameField";
import { SelectItem } from "@/utils/type";
import { SignUpRequest, signUp } from "@/service/user/signup";
import { getSelectItemValue, isValidEmail, isValidNickname, isValidPassword } from "@/utils/common";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@/store/CommonStateStore";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import PositionSelect from "@/components/user/signup/PositionSelect";
import useClientMount from "@/hooks/useClientMount";

function SignUpForm() {
  const router = useRouter();
  const setSnackbar = useSetRecoilState(snackbarState);
  const mounted = useClientMount();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [position, setPosition] = useState<SelectItem | null>(null);
  const [techStacks, setTechStacks] = useState<SelectItem[]>([]);
  const [selfIntroduction, setSelfIntroduction] = useState("");

  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const isValid = () => {
    if (email === "") {
      setSnackbar({ show: true, type: "ERROR", content: "이메일을 입력해주세요." });
      return false;
    }

    // 이메일 형식 아닐 경우
    if (!isValidEmail(email)) {
      setSnackbar({ show: true, type: "ERROR", content: "이메일 형식이 아닙니다." });
      return false;
    }

    if (password === "") {
      setSnackbar({ show: true, type: "ERROR", content: "비밀번호를 입력해주세요." });
      return false;
    }

    // 비밀번호 형식이 맞지 않는 경우
    if (!isValidPassword(password)) {
      setSnackbar({ show: true, type: "ERROR", content: "비밀번호는 영어와 특수문자를 포함하고, 6~12 자리만 가능합니다." });
      return false;
    }

    if (passwordConfirmation === "") {
      setSnackbar({ show: true, type: "ERROR", content: "비밀번호 확인를 입력해주세요." });
      return false;
    }

    // 비밀번호와 비밀번호 확인이 다를 경우
    if (password !== passwordConfirmation) {
      setSnackbar({ show: true, type: "ERROR", content: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
      return false;
    }

    if (nickname === "") {
      setSnackbar({ show: true, type: "ERROR", content: "닉네임을 입력해주세요." });
      return false;
    }

    // 닉네임 형식이 맞지 않는 경우
    if (!isValidNickname(nickname)) {
      setSnackbar({ show: true, type: "ERROR", content: "닉네임은 영어 숫자 포함 6~10 자리만 가능합니다." });
      return false;
    }

    // 닉네임 중복 확인 하지 않았을 경우
    if (!isCheckedNickname) {
      setSnackbar({ show: true, type: "ERROR", content: "닉네임 중복확인을 해주세요." });
      return false;
    }

    if (!position) {
      setSnackbar({ show: true, type: "ERROR", content: "직무를 선택해주세요." });
      return false;
    }

    if (techStacks.length === 0) {
      setSnackbar({ show: true, type: "ERROR", content: "관심 스택을 선택해주세요." });
      return false;
    }

    return true;
  }

  const userSignUp = () => {
    if (!isValid()) {
      return;
    }

    if (position) {
      const positionId = getSelectItemValue(position);
      const techStackIds = techStacks.map(stack => getSelectItemValue(stack));

      const signUpRequest = { email, password, nickname, positionId, techStackIds, intro: selfIntroduction } as SignUpRequest;
      signUp(signUpRequest).then(response => {
        const { result, message } = response;
        if (result === "success") {
          router.push("/");

          setSnackbar({ show: true, type: "INFO", content: message });
        }
      });
    }
  }

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(false);
  }


  return (
    <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3">
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput id="password" label="비밀번호" placeholder="영문, 특수문자 포함 6~12자" required
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput id="passwordConfirmation" label="비밀번호 확인" placeholder="영문, 특수문자 포함 6~12자" required
        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      <NicknameField placeholder="영문, 숫자 포함 6~10자" setCheck={setIsCheckedNickname} required
        value={nickname} onChange={onChangeNickname} />
      {
        mounted ? (
          <>
            <Suspense fallback={<SelectSkeleton label="직무" placeholder="직무를 선택해주세요." required />}>
              <PositionSelect position={position} setPosition={setPosition} required />
            </Suspense>
            <Suspense fallback={<SelectSkeleton label="관심 스택" placeholder="관심 스택을 선택해주세요." required />}>
              <TechStackSelect techStacks={techStacks} setTechStacks={setTechStacks} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
            </Suspense>
          </>
        ) : (
          <>
            <SelectSkeleton label="직무" placeholder="직무를 선택해주세요." required />
            <SelectSkeleton label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
          </>
        )
      }
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={userSignUp}>가입</FormButton>
    </div>
  )
}

export default SignUpForm;