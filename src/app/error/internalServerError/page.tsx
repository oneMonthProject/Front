import React from 'react';
import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Navigator from "@/components/ui/error/Navigator";
import StyledLink from "@/components/ui/StyledLink";
import ErrorPageContainer from "@/components/ui/error/ErrorPageContainer";

function Page() {
    return (
        <ErrorPageContainer>
            <ErrorMessage>프로세스 수행중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.</ErrorMessage>
            <Navigator>
                {/*<StyledLink href='/login'>로그인</StyledLink>*/}
                {/*<StyledLink href='/'>홈으로</StyledLink>*/}
            </Navigator>
        </ErrorPageContainer>
    );
}

export default Page;