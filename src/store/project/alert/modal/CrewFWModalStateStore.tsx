import {ModalState} from "@/utils/type";
import {atom} from "recoil";
import {VAlertFWCreateData} from "@/service/project/alert/type";
import {FWReason} from "@/service/project/alert/constant";

export type CrewFWModalState = ModalState & {
    createData: VAlertFWCreateData;
};

export const crewFWModalStateStore = atom<CrewFWModalState>({
    key: 'crewFWModalStateStore',
    default: {
        isOpen: false,
        title: "강제탈퇴 투표 생성",
        createData: {
            project_id: 0n,
            fw_member_id: 0n,
            fw_member_auth: {
                projectMemberAuthId: 0n,
                projectMemberAuthName: '',
                milestone_change_YN: false,
                work_change_YN: false,
                vote_YN: false,
                config_YN: false,
            },
            authMap: {
                milestoneAuth: false,
                workAuth: false,
                voteAuth: false,
                configAuth: false
            },
            reason: FWReason.FWR1004.code
        }
    }
});