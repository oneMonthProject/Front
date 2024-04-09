'use client';
import React, {useState} from "react";
import Button from "@/components/ui/Button";
import CalendarInput from "@/components/ui/form/CalendarInput";
import Input from "@/components/ui/form/Input";
import {ProjectInfo, SelectItem, TrustGradeNameType, TrustGradeValueType} from "@/utils/type";
import TrustGradeSelect from "@/components/post/register/TrustGradeSelect";
import {createTrustGradeSelectItem} from "@/utils/common";
import {useQueryClient} from "@tanstack/react-query";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {
    endProject as endProjectAPI,
    updateProjectInfo as updateProjectInfoAPI,
    WritableProjectInfo
} from "@/service/project/project";
import {useRouter} from "next/navigation";


export default function ProjectSetting({data}:{data:ProjectInfo}) {
    const {
        projectId,
        name: initProjectName,
        startDate: initStartDate,
        endDate: initEndDate,
        trustGrade: {name: initTrustGrade},
        status: initStatus,
        subject: initSubject,
        authMap: {milestoneAuth}
    } = data!;

    const [projectName, setProjectName] = useState(() => initProjectName);
    const [projectSubject, setProjectSubject] = useState(() => initSubject);
    const [trustGrade, setTrustGrade] = useState<SelectItem | null>(() => createTrustGradeSelectItem(initTrustGrade as TrustGradeNameType));
    const [startDate, setStartDate] = useState<string | null>(() => initStartDate);
    const [endDate, setEndDate] = useState<string | null>(() => initEndDate);
    const router = useRouter();

    const setSnackbar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const initProjectInfo = () => {
        setProjectName(initProjectName);
        setProjectSubject(initSubject);
        setTrustGrade(createTrustGradeSelectItem(initTrustGrade as TrustGradeNameType));
        setStartDate(initStartDate);
        setEndDate(initEndDate);
    }


    const updateProjectInfo = async () => {
        if (confirm("프로젝트 정보를 수정하시겠습니까?")) {
            if (!milestoneAuth) {
                setSnackbar({show: true, type: 'INFO', content: '프로젝트 수정 권한이 없습니다.'});
                return;
            }

            if (!projectName) {
                setSnackbar({show: true, type: 'ERROR', content: '프로젝트 이름을 입력해주세요'});
                return;
            }

            if (!projectSubject) {
                setSnackbar({show: true, type: 'ERROR', content: '프로젝트 주제를 입력해주세요'});
                return;
            }

            if (!trustGrade?.value) {
                setSnackbar({show: true, type: 'ERROR', content: '프로젝트 신뢰등급을 선택해주세요'});
                return;
            }

            if (!startDate) {
                setSnackbar({show: true, type: 'ERROR', content: '시작날짜를 선택해주세요'});
                return;
            }

            if (!endDate) {
                setSnackbar({show: true, type: 'ERROR', content: '종료날짜를 선택해주세요'});
                return;
            }

            const projectInfo: WritableProjectInfo = {
                projectId,
                projectName,
                subject: projectSubject,
                trustGradeId: trustGrade!.value as TrustGradeValueType,
                startDate,
                endDate
            }

            const res = await updateProjectInfoAPI(projectInfo);
            if (res.result === 'success') {
                queryClient.invalidateQueries({queryKey: ['projectInfo']});
                setSnackbar({show: true, type: 'SUCCESS', content: '프로젝트 정보를 수정했습니다.'});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 에러가 발생했습니다.'});
            }
        }
    }

    const endProject = async () => {
        if (confirm("프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된 모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요. \r\n\r\n 종료하시겠습니까?")) {
            const res = await endProjectAPI(projectId);
            if (res.result === 'success') {
                setSnackbar({show: true, type: 'SUCCESS', content: '프로젝트를 종료했습니다.'});
                router.push("/");
                router.refresh();
            } else if (res.result === 'fail') {
                setSnackbar({show: true, type: 'ERROR', content: res.message});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: "프로세스 수행중 에러가 발생했습니다."});
            }
        }
    }

    return (
        <div className="space-y-6 px-8 mobile:px-4">
            <div className="space-y-6">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 정보 설정</div>
                <div className="flex mobile:block pc:space-x-8 tablet:space-x-8 mobile:space-y-3 px-3 mobile:px-0">
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <Input id="projectName" label="프로젝트 이름" placeholder="이름을 입력해주세요."
                               value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                        <Input id="projectSubject" label="프로젝트 주제" placeholder="주제를 입력해주세요."
                               value={projectSubject} onChange={(e) => setProjectSubject(e.target.value)}/>
                        <TrustGradeSelect trustGrade={trustGrade}
                                          setTrustGrade={(item: SelectItem) => setTrustGrade(item)}/>
                    </div>
                    <div className="w-[380px] mobile:w-full space-y-5 mobile:space-y-3 mobile:mx-auto">
                        <CalendarInput id="startDate" label="시작 날짜" placeholder="날짜를 선택해주세요."
                                       date={startDate} setDate={setStartDate}/>
                        <CalendarInput id="endDate" label="종료 날짜" placeholder="날짜를 선택해주세요."
                                       date={endDate} setDate={setEndDate}/>
                    </div>
                </div>
                <div className="text-end space-x-2 px-3 mobile:px-0">
                    <Button theme="primary-hollow" size="md" onClickHandler={initProjectInfo}>초기화</Button>
                    <Button size="md" onClickHandler={updateProjectInfo}>저장</Button>
                </div>
            </div>
            <div className="space-y-3">
                <div className="font-semibold text-xl mobile:text-lg py-2 border-b-2">프로젝트 상태 설정</div>
                <div className="flex mobile:flex-col px-3 mobile:px-0">
                    <div className="self-center mobile:text-sm">프로젝트 종료 후 다시 상태를 변경할 수 없습니다.</div>
                    <div className="ml-auto mobile:mt-2">
                        <Button theme='black' size='md' onClickHandler={endProject}>프로젝트 종료</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}