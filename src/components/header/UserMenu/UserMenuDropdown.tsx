'use client';

import React from 'react';
import DropDownWithIcon from "@/components/ui/DropDownWithIcon";
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";
import {DropDownItem} from "@/utils/type";
import {useMutation} from "@tanstack/react-query";
import {logout} from "@/service/user/logout";
import {isEqual} from "lodash";
import {useRouter} from "next/navigation";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {activeTabState} from "@/store/post/PostStateStore";
import {snackbarState} from "@/store/CommonStateStore";

function UserMenuDropdown() {
    const router = useRouter();
    const resetActiveTab = useResetRecoilState(activeTabState);
    const setSnackbar = useSetRecoilState(snackbarState);

    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            const { message, result } = data;
            if (isEqual(result, "success")) {
                resetActiveTab();

                router.push("/");
                router.refresh();

                setSnackbar({ show: true, type: "INFO", content: message });
            } else {
                setSnackbar({ show: true, type: "ERROR", content: message });
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    const items: DropDownItem[] = [
        {name:'내 프로필', value:'/user/profile'},
        {name:'로그아웃', value:'/user/logout', onClickHandler: () => mutate()},
    ]

    return (
        <DropDownWithIcon items={items} icon={<FaChevronDown className="h-4 w-4" aria-hidden="true" />} srOnlyButtonName='사용자 메뉴' />
    );
}

export default UserMenuDropdown;