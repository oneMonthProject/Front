import React from 'react';
import ErrorPageContainer from "@/components/ui/error/ErrorPageContainer";
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Navigator from "@/components/ui/error/Navigator";
import StyledLink from "@/components/ui/StyledLink";

function Page() {
    return (
        <ErrorPageContainer>
            <ErrorMessage>로그인이 만료되었습니다.</ErrorMessage>
            <Navigator>
                <StyledLink href='/login'>로그인</StyledLink>
                <StyledLink href='/'>홈으로</StyledLink>
            </Navigator>
        </ErrorPageContainer>
    );
}

export default Page;