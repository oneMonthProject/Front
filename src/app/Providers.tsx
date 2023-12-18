'use client';
import React, { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {setupMocks} from "@/mocks";
import { setCookie } from 'cookies-next';

function Providers({ children, isTestMode }: { children: ReactNode, isTestMode:boolean }) {
    const [queryClient] = useState(() => new QueryClient());

    if(isTestMode){
        import('../mocks').then(async ({setupMocks}) => {
            await setupMocks();
        });

        setCookie('accessToken','abc-123');
    }
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default Providers;