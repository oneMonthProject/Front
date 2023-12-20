'use client';
import React, {ReactNode, useRef, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {setupMocks} from "@/mocks";
import {setCookie} from 'cookies-next';
import {ReactQueryStreamedHydration} from "@tanstack/react-query-next-experimental";

function Providers({children, isTestMode}: { children: ReactNode, isTestMode: boolean }) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient());


    if (isTestMode) {
        import('../mocks').then(async ({setupMocks}) => {
            await setupMocks();
        });

        setCookie('Access', 'abc-123');
    }
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ReactQueryStreamedHydration>
                    {children}
                </ReactQueryStreamedHydration>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default Providers;