import React, {useState} from 'react';
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import Select from "@/components/ui/selector/Select";
import Button from "@/components/ui/Button";
import {ProjectAuthMap, ProjectMember} from "@/utils/type";
import {useMutation} from "@tanstack/react-query";
import {
    ProjectSettingCrewAuthUpdData,
    updateProjectSettingCrewAuth as updateProjectSettingCrewAuthAPI
} from "@/service/project/setting/crewAuth";
import {numStrToBigInt} from "@/utils/common";
import useSnackbar from "@/hooks/useSnackbar";

function CrewAuthRow({crew, projectId, authMap}: { crew: ProjectMember, projectId: string, authMap: ProjectAuthMap }) {
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const {projectMemberAuth: initAuth, user, position} = crew;
    const [auth, setAuth] = useState(() => ({
        name: initAuth.projectMemberAuthName,
        value: initAuth.projectMemberAuthId
    }));

    const {mutate: updateProjectSettingCrewAuth, isPending} = useMutation({
        mutationFn: (reqData: ProjectSettingCrewAuthUpdData) => updateProjectSettingCrewAuthAPI(reqData),
        onSuccess: (data) => {
            if (data.result === "success") {
                setSuccessSnackbar("크루 권한을 수정했습니다.");
            } else {
                setErrorSnackbar(data.message);
            }
        },
        onError: (error) => {
            setErrorSnackbar(error.message);
        },
    });

    const onClickSaveCrewAuthButtonHandler = () => {
        const reqData: ProjectSettingCrewAuthUpdData = {
            authMap,
            projectId: numStrToBigInt(projectId),
            projectMemberAuthId: auth.value,
            projectMemberId: crew.projectMemberId
        };

        updateProjectSettingCrewAuth(reqData);
    }

    return (
        <tr>
            <td className="tablet:w-[40%] mobile:w-[20%] whitespace-nowrap py-5 pl-4 pr-3 text-base">
                <div className=" flex items-center">
                    <div className="h-11 w-11 flex-shrink-0 mobile:hidden">
                        <Avatar alt="크루 프로필 이미지" size='xs' src={user.profileImgSrc}/>
                    </div>
                    <div className="ml-4 mobile:ml-0">
                        <div className="font-medium text-gray-900">
                            {user.nickname}
                        </div>
                    </div>
                    <div className="ml-3 mobile:ml-2">
                        <PositionBadge text={position.name} size='sm'/>
                    </div>
                </div>
            </td>
            <td className="max-w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div className=" flex items-center">
                    <div className='w-[230px] mobile:w-[95px]'>
                        <Select
                            items={[{name: '매니저', value: 1n}, {name: '크루', value: 3n}]}
                            setValue={(crew) => setAuth(crew)}
                            value={auth}
                        />
                    </div>
                </div>
            </td>
            <td className="max-w-[30%] relative whitespace-nowrap py-5 pl-3 pr-4 tablet:text-right text-sm font-medium sm:pr-0">
                <div className='w-[100px] mobile:w-[80px]'>
                    <Button
                        theme='primary'
                        onClickHandler={onClickSaveCrewAuthButtonHandler}
                    >
                        저장
                        <span className='sr-only'>, 이름</span>
                    </Button>
                </div>

            </td>
        </tr>
    );
}

export default CrewAuthRow;