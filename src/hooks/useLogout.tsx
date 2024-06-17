import {useRouter} from "next/navigation";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {activeTabState} from "@/store/post/PostStateStore";
import {snackbarState} from "@/store/CommonStateStore";
import {useMutation} from "@tanstack/react-query";
import {logout as logoutAPI} from "@/service/user/logout";
import {isEqual} from "lodash";
import {userStateStore} from "@/store/user/UserStateStore";

export default function useLogout() {
    const router = useRouter();
    const resetActiveTab = useResetRecoilState(activeTabState);
    const resetUserIdState = useResetRecoilState(userStateStore)
    const setSnackbar = useSetRecoilState(snackbarState);

    const {mutate} = useMutation({
        mutationFn: logoutAPI,
        onSuccess: (res) => {
            const {message, result, data} = res;
            if (isEqual(result, "success")) {
                resetUserIdState();
                resetActiveTab();

                router.push("/");
                router.refresh();

                setSnackbar({show: true, type: "INFO", content: message});
            }

            if(isEqual(result, "redirect")){
                resetUserIdState();
                router.push(data);
                router.refresh();
                setSnackbar({show: true, type: "INFO", content: message});
            }

            if(isEqual(result, "error")) {
                setSnackbar({show: true, type: "ERROR", content: message});
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    return {logout: mutate}
}