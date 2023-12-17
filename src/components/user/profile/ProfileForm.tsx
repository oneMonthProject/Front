'use client';
import React, { ChangeEvent, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import NicknameField from "@/components/ui/form/NickNameField";
import TextArea from "@/components/ui/form/TextArea";
import FormButton from "@/components/ui/form/FormButton";
import { SelectItem } from "@/utils/type";
import { getPositionSelectItem, getSelectItemValue, getTechStackSelectItem } from "@/utils/common";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { updateUser, updateUserInfo } from "@/service/user";

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

function ProfileForm() {
  const router = useRouter();

  const { data, isLoading, error } = useProfileInfo();

  // Loading 시 Skeleton 추가
  // Error 시 Snackbar 추가
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const profileData = data!.data;

  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(profileData?.profileImgSrc ?? null);
  const [nickname, setNickname] = useState(profileData.nickname);
  const [position, setPosition] = useState<SelectItem | null>(getPositionSelectItem(profileData.position));
  const [techStack, setTechStack] = useState<SelectItem[]>(getTechStackSelectItem(profileData.techStacks));
  const [selfIntroduction, setSelfIntroduction] = useState(profileData?.intro ?? "");

  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  const isValidNickname = (nickname: string) => {
    const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
    return nicknameRegex.test(nickname);
  }

  const isValid = () => {
    // 값이 비어있을 경우
    if (nickname === "" || !position || techStack.length === 0) {
      // Snackbar 추가
      console.log("필수값들을 입력 또는 선택해주세요.");

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

  const saveProfile = () => {
    if (!isValid()) {
      return;
    }

    if (position) {
      const positionId = getSelectItemValue(position);
      const techStackIds = techStack.map(stack => getSelectItemValue(stack));
      const updateData = { id: profileData.userId, nickname, positionId, techStackIds } as updateUserInfo;
      updateUser(updateData).then(response => {
        const { result } = response;
        if (result === "success") {
          router.push("/user/profile");
        }
      }).catch(error => {
        // error 표시
      });
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      setSelectedImage(file);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleFileButtonClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const deleteImage = () => {
    setImageSrc(null);
    setSelectedImage(null);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  }

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(false);
  }

  return (
    <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3">
      <div className="w-full h-fit text-center">
        <Avatar size="lg" src={imageSrc} alt="빈 프로필" />
      </div>
      <div className="text-center space-x-1">
        <input ref={fileRef} type="file" accept='.png, .jpg, .jpeg, .gif' hidden onChange={handleImageChange} />
        <Button size="md" theme="primary-hollow" onClickHandler={handleFileButtonClick}>{imageSrc === null ? "이미지 변경" : "변경"}</Button>
        <Button size="md" theme="primary" onClickHandler={deleteImage} hidden={imageSrc === null}>삭제</Button>
      </div>
      <Input id="email" label="이메일" required disabled defaultValue={profileData.email} />
      <NicknameField value={nickname} onChange={onChangeNickname}
        placeholder="닉네임을 입력해주세요." setCheck={setIsCheckedNickname} required />
      <Select value={position} setValue={setPosition} items={positionList} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect values={techStack} setValues={setTechStack} items={techStackList} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={saveProfile}>저장</FormButton>
    </div>
  )
}

export default ProfileForm;