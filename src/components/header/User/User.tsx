'use client';
import React, {useEffect} from 'react';
import {UserMenu} from "@/components/header/User/index";
import useClientMount from "@/hooks/useClientMount";
import LoginNav from "@/components/header/User/LoginNav";
import {useRecoilState} from "recoil";
import {userStateStore} from "@/store/user/UserStateStore";
import {getCookie, hasCookie} from "cookies-next";
import UserMenuSkeleton from "@/components/ui/skeleton/header/UserMenuSkeleton";

function User() {
    const mounted = useClientMount();
    const [userIdState, setUserIdState] = useRecoilState(userStateStore);

    useEffect(() => {
        if (userIdState === null && hasCookie("user_id")) {
            setUserIdState(getCookie("user_id") as string);
        }

        if (userIdState !== null && !hasCookie("user_id")) {
            setUserIdState(null);
        }
    }, [userIdState, setUserIdState]);

    return (
        <li className='tablet:ml-5 mobile:ml-2'>
            {
                mounted
                    ? (userIdState !== null ? <UserMenu/> : <LoginNav/>)
                    : <UserMenuSkeleton/>
            }
        </li>
    )
}

export default User;