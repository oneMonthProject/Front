'use client';
import React from 'react';
import {UserMenu} from "@/components/header/User/index";
import useClientMount from "@/hooks/useClientMount";
import LoginNav from "@/components/header/User/LoginNav";
import {useRecoilValue} from "recoil";
import {userStateStore} from "@/store/user/UserStateStore";

function User() {
    const userIdState = useRecoilValue(userStateStore);
    const mounted = useClientMount();
    return (mounted && userIdState !== null) ? <UserMenu /> : <LoginNav/>;
}

export default User;