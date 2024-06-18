'use client';
import React, {useEffect} from 'react';
import {UserMenu} from "@/components/header/User/index";
import useClientMount from "@/hooks/useClientMount";
import LoginNav from "@/components/header/User/LoginNav";
import {useRecoilState, useRecoilValue} from "recoil";
import {userStateStore} from "@/store/user/UserStateStore";
import {getCookie, hasCookie} from "cookies-next";

function User() {
    const [userIdState, setUserIdState] = useRecoilState(userStateStore);
    const mounted = useClientMount();

    useEffect(() => {
       if(userIdState === null && hasCookie("user_id")){
           setUserIdState(getCookie("user_id") as string);
       }

       if(userIdState !== null && !hasCookie("user_id")){
           setUserIdState(null);
       }
    },[userIdState, setUserIdState]);

    return (mounted && userIdState !== null) ? <UserMenu /> : <LoginNav/>;
}

export default User;