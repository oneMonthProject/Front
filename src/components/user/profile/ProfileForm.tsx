'use client';
import React, { ChangeEvent, useRef, useState } from "react";
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/user/form/Input";
import NicknameField from "@/components/user/form/NickNameField";
import TextArea from "@/components/user/form/TextArea";
import FormButton from "@/components/user/form/FormButton";
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

function ProfileForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [email, setEmail] = useState("example@trustcrews.com");
  const [nickname, setNickname] = useState("Robert Whistable");
  const [position, setPosition] = useState<SelectItem | null>(positionList[0]);
  const [techStack, setTechStack] = useState<SelectItem[]>([techStackList[0], techStackList[1], techStackList[5], techStackList[8], techStackList[9]]);
  const [selfIntroduction, setSelfIntroduction] = useState("개발 N년차 웹 프론트엔드 개발자 입니다.");

  const saveProfile = () => {

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
      <Input id="email" label="이메일" placeholder="example@trustcrews.com" required disabled
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <NicknameField value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력해주세요." required />
      <Select value={position} setValue={setPosition} items={positionList} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect values={techStack} setValues={setTechStack} items={techStackList} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={saveProfile}>저장</FormButton>
    </div>
  )
}

export default ProfileForm;