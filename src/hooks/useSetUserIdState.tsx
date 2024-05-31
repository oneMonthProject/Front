import {useRecoilState, useSetRecoilState} from "recoil";
import {userStateStore} from "@/store/user/UserStateStore";
import {useEffect} from "react";

export default function useSetUserIdState(userId:string) {
    const setUserIdState = useSetRecoilState(userStateStore);

    useEffect(() => {
        setUserIdState(userId)
    }, [userId, setUserIdState]);
}