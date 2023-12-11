'use client';
import React, { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from 'react-cookie';

function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <RecoilRoot>
            <CookiesProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools />
                </QueryClientProvider>
            </CookiesProvider>
        </RecoilRoot>
    );
}

export default Providers;