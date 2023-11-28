import React from 'react';
import Button from "@/components/ui/Button";

const currentUserId = 'test'

// todo - 현재 로그인 사용자 id
// 프로젝트 탈퇴 / 강제탈퇴 로직
function LeaveProjectButton({userId, projectId}: { userId: string; projectId: string }) {
    return (
        <Button
            size='lg'
            theme='primary-hollow'
            onClickHandler={() => console.log(userId)}
        >
            {userId === currentUserId ? '프로젝트 탈퇴' : '프로젝트 강제 탈퇴'}
        </Button>
    );
}

export default LeaveProjectButton;