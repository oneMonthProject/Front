'use client';
import React, { ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true'){
        import('../mocks').then(async ({setupMocks}) => {
            setupMocks();
        });
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