'use client';
import React, { ChangeEvent, useRef, useState } from "react";
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import NicknameField from "@/components/ui/form/NickNameField";
import TextArea from "@/components/ui/form/TextArea";
import FormButton from "@/components/ui/form/FormButton";
import { SelectItem } from "@/utils/type";
import { getPositionSelectItem, getPositionSelectItems, getSelectItemValue, getTechStackSelectItems, isValidNickname } from "@/utils/common";
import { useProfileInfo } from "@/hooks/useProfileInfo";
import { updateUser, updateUserInfo, updateUserProfileImg } from "@/service/user/user";
import { useSetRecoilState } from "recoil";
import { usePositionList } from "@/hooks/usePositionList";
import { useTechStackList } from "@/hooks/useTechStackList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { snackbarState } from "@/store/CommonStateStore";

function ProfileForm() {
  const queryClient = useQueryClient();

  const profileData = useProfileInfo();
  const positions = usePositionList();
  const techStacks = useTechStackList();

  const [imageSrc, setImageSrc] = useState<string | null>(profileData?.profileImgSrc || null);
  const [nickname, setNickname] = useState(profileData.nickname);
  const [position, setPosition] = useState<SelectItem | null>(getPositionSelectItem(profileData.position));
  const [techStack, setTechStack] = useState<SelectItem[]>(getTechStackSelectItems(profileData.techStacks));
  const [selfIntroduction, setSelfIntroduction] = useState(profileData?.intro ?? "");

  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCheckedNickname, setIsCheckedNickname] = useState(true);
  const setSnackbar = useSetRecoilState(snackbarState);

  const { mutate } = useMutation({
    mutationFn: (updateData: updateUserInfo) => updateUser(updateData, selectedImage),
    onSuccess: (data) => {
      const { message, result } = data;
      if (isEqual(result, "success")) {
        setSnackbar({ show: true, type: "SUCCESS", content: message });
        queryClient.invalidateQueries({ queryKey: ['profileInfo'] });
        queryClient.invalidateQueries({ queryKey: ['simpleUserInfo'] });
      } else {
        setSnackbar({ show: true, type: "ERROR", content: message });
      }
    },
    onError: (err) => {
      console.log("err", err);
    }
  });

  const isValid = () => {
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

    if (techStack.length === 0) {
      setSnackbar({ show: true, type: "ERROR", content: "관심 스택을 선택해주세요." });
      return false;
    }

    return true;
  }

  const saveProfile = () => {
    if (!isValid()) {
      return;
    }

    // 기존 프로필 이미지를 삭제할 때의 로직 추가하기
    if (position) {
      const positionId = getSelectItemValue(position);
      const techStackIds = techStack.map(stack => getSelectItemValue(stack));
      const updateData = { nickname, positionId, techStackIds, intro: selfIntroduction } as updateUserInfo;
      mutate(updateData);
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
    const newName = e.target.value;

    setNickname(newName);
    if (isEqual(newName, profileData.nickname)) {
      setIsCheckedNickname(true);
    } else {
      setIsCheckedNickname(false);
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
      <Input id="email" label="이메일" required disabled defaultValue={profileData.email} />
      <NicknameField value={nickname} defaultValue={profileData.nickname} onChange={onChangeNickname}
        placeholder="영문, 숫자 포함 6자 이상" setCheck={setIsCheckedNickname} required />
      <Select value={position} setValue={setPosition} items={getPositionSelectItems(positions)} label="직무" placeholder="직무를 선택해주세요." required />
      <MultiSelect values={techStack} setValues={setTechStack} items={getTechStackSelectItems(techStacks)} label="관심 스택" placeholder="관심 스택을 선택해주세요." required />
      <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25}
        value={selfIntroduction} onChange={(e) => setSelfIntroduction(e.target.value)} />
      <FormButton onClick={saveProfile}>저장</FormButton>
    </div>
  )
}

export default ProfileForm;