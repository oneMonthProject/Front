'use client';
import React, {ReactNode, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false}/>
                {children}
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default Providers;