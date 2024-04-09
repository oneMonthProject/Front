'use client';
import React, {ReactNode, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ReactQueryStreamedHydration} from "@tanstack/react-query-next-experimental";

function Providers({children}: { children: ReactNode}) {
    const [queryClient] = useState<QueryClient>(() => new QueryClient());

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