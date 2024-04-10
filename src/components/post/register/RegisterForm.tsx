'use client';
import React, {Suspense, useState} from "react";
import {useRouter} from 'next/navigation';
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/TextArea";
import CalendarInput from "@/components/ui/form/CalendarInput";
import {SelectItem} from "@/utils/type";
import {numStrToBigInt} from "@/utils/common";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPost, CreatePostInfo} from "@/service/post/post";
import {isEqual} from "lodash";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import TrustGradeSelect from "./TrustGradeSelect";
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import MultiPositionSelect from "./MultiPositionSelect";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import useClientMount from "@/hooks/useClientMount";

const recruitmentCountList = [
    {value: -1, name: '인원 미정'},
    {value: 1, name: '1명'},
    {value: 2, name: '2명'},
    {value: 3, name: '3명'},
    {value: 4, name: '4명'},
    {value: 5, name: '5명'},
    {value: 6, name: '6명'},
    {value: 7, name: '7명'},
    {value: 8, name: '8명'},
    {value: 9, name: '9명'},
    {value: 10, name: '10명'},
];

function RegisterForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const setSnackbar = useSetRecoilState(snackbarState);
    const mounted = useClientMount();

    const {mutate} = useMutation({
        mutationFn: (createData: CreatePostInfo) => createPost(createData),
        onSuccess: (data) => {
            const {message, result} = data;
            if (isEqual(result, "success")) {
                setSnackbar({show: true, type: "SUCCESS", content: message});
                queryClient.invalidateQueries({queryKey: ['postList']});
                queryClient.invalidateQueries({queryKey: ['myProjectList']});

                goHome();
            } else {
                setSnackbar({show: true, type: "ERROR", content: message});
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    const [title, setTitle] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectSubject, setProjectSubject] = useState("");
    const [trustGrade, setTrustGrade] = useState<SelectItem<string, string>>({name: '신뢰등급 선택', value: ''});
    const [recruitmentCount, setRecruitmentCount] = useState<SelectItem<string, number>>(recruitmentCountList[0]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [positions, setPositions] = useState<SelectItem<string, string>[]>([]);
    const [techStacks, setTechStacks] = useState<SelectItem<string, string>[]>([]);
    const [contact, setContact] = useState("");
    const [projectInfo, setProjectInfo] = useState("");

    const isValid = () => {
        if (title === "") {
            setSnackbar({show: true, type: "ERROR", content: "제목을 입력해주세요."});
            return false;
        }

        if (projectName === "") {
            setSnackbar({show: true, type: "ERROR", content: "프로젝트 이름을 입력해주세요."});
            return false;
        }

        if (projectSubject === "") {
            setSnackbar({show: true, type: "ERROR", content: "프로젝트 주제을 입력해주세요."});
            return false;
        }

        if (!trustGrade) {
            setSnackbar({show: true, type: "ERROR", content: "프로젝트 신뢰등급을 선택해주세요."});
            return false;
        }

        if (!recruitmentCount) {
            setSnackbar({show: true, type: "ERROR", content: "모집 인원을 선택해주세요."});
            return false;
        }

        if (positions.length === 0) {
            setSnackbar({show: true, type: "ERROR", content: "모집 분야을 선택해주세요."});
            return false;
        }

        if (!startDate) {
            setSnackbar({show: true, type: "ERROR", content: "시작 날짜를 선택해주세요."});
            return false;
        }

        if (!endDate) {
            setSnackbar({show: true, type: "ERROR", content: "종료 날짜를 선택해주세요."});
            return false;
        }

        if (techStacks.length === 0) {
            setSnackbar({show: true, type: "ERROR", content: "관심 스택을 선택해주세요."});
            return false;
        }

        if (contact === "") {
            setSnackbar({show: true, type: "ERROR", content: "연락 방법을 입력해주세요."});
            return false;
        }

        if (projectInfo === "") {
            setSnackbar({show: true, type: "ERROR", content: "프로젝트 소개를 입력해주세요."});
            return false;
        }

        return true;
    }


    const goHome = () => {
        router.push("/");
    }

    const registerPost = () => {
        if (!isValid()) {
            return;
        }

        const positionIds = positions.map(({value}) => numStrToBigInt(value));
        const trustGradeId = numStrToBigInt(trustGrade?.value);
        const crewNumber = recruitmentCount.value;
        const technologyIds = techStacks.map(({value}) => numStrToBigInt(value));
        const board = {title, content: projectInfo, contact, positionIds};
        const project = {
            name: projectName,
            subject: projectSubject,
            crewNumber,
            trustGradeId,
            startDate,
            endDate,
            technologyIds
        };
        const createData = {board, project} as CreatePostInfo;
        mutate(createData);
    }


    return (
        <div className="w-full max-w-[800px] mobile:max-w-[400px] mx-auto space-y-5 mobile:space-y-3 my-8 mobile:my-6">
            <div className="w-full mobile:w-[300px] mx-auto">
                <div className="flex items-center border-b-2 border-grey600 py-2 mobile:py-0">
                    <input type="text" placeholder="제목을 입력해주세요." aria-label="title" value={title}
                           onChange={e => setTitle(e.target.value)}
                           className="appearance-none bg-transparent border-none w-full placeholder-grey600 font-semibold text-2xl mobile:text-lg border text-grey600 mr-3 py-1 px-2 leading-tight focus:border-transparent focus:outline-none focus:ring-transparent"/>
                </div>
            </div>
            <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3">
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <Input id="projectName" label="프로젝트 이름" placeholder="이름을 입력해주세요."
                           value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                    <Input id="projectSubject" label="프로젝트 주제" placeholder="주제를 입력해주세요."
                           value={projectSubject} onChange={(e) => setProjectSubject(e.target.value)}/>
                    {
                        mounted ? (
                            <Suspense fallback={<SelectSkeleton label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>}>
                                <TrustGradeSelect trustGrade={trustGrade} setTrustGrade={setTrustGrade}/>
                            </Suspense>
                        ) : <SelectSkeleton label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>
                    }
                    <Select value={recruitmentCount} setValue={setRecruitmentCount} items={recruitmentCountList}
                            label="모집 인원" placeholder="모집 인원을 선택해주세요."/>
                    {
                        mounted ? (
                            <Suspense fallback={<SelectSkeleton label="모집 분야" placeholder="모집 분야를 선택해주세요."/>}>
                                <MultiPositionSelect positions={positions} setPositions={setPositions}/>
                            </Suspense>
                        ) : <SelectSkeleton label="모집 분야" placeholder="모집 분야를 선택해주세요."/>
                    }
                </div>
                <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto">
                    <CalendarInput id="startDate" label="시작 날짜" placeholder="날짜를 선택해주세요."
                                   date={startDate} setDate={setStartDate}/>
                    <CalendarInput id="endDate" label="종료 날짜" placeholder="날짜를 선택해주세요."
                                   date={endDate} setDate={setEndDate}/>
                    {
                        mounted ? (
                            <Suspense fallback={<SelectSkeleton label="사용 스택" placeholder="사용 스택을 선택해주세요."/>}>
                                <TechStackSelect techStacks={techStacks} setTechStacks={setTechStacks} label="사용 스택"
                                                 placeholder="사용 스택을 선택해주세요."/>
                            </Suspense>
                        ) : <SelectSkeleton label="사용 스택" placeholder="사용 스택을 선택해주세요."/>
                    }
                    <Input id="contact" label="연락 방법" placeholder="오픈 카톡 링크 / 이메일 / 구글 폼 주소"
                           value={contact} onChange={(e) => setContact(e.target.value)}/>
                </div>
            </div>
            <div className="mobile:w-[300px] mx-auto">
                <TextArea id="information" label="프로젝트 소개" placeholder="프로젝트에 대해 소개해주세요." rows={10} cols={25}
                          value={projectInfo} onChange={(e) => setProjectInfo(e.target.value)}/>
            </div>
            <div className="mobile:w-[300px] space-x-1 text-right">
                <Button theme="primary-hollow" onClickHandler={goHome}>취소</Button>
                <Button onClickHandler={registerPost}>등록</Button>
            </div>
        </div>
    )
}

export default RegisterForm;