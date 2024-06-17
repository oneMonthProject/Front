'use client';
import React from 'react';
import {UserMenu} from "@/components/header/User/index";
import useClientMount from "@/hooks/useClientMount";
import {hasCookie} from "cookies-next";
import LoginNav from "@/components/header/User/LoginNav";

function User() {
    const mounted = useClientMount();
    return (mounted && hasCookie("user_id")) ? <UserMenu /> : <LoginNav/>;
}

export default User;