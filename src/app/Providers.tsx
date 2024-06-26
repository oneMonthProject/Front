'use client';
import React, {ReactNode, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ReactQueryStreamedHydration} from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/build/modern/production.js').then(
        (d) => ({
            default: d.ReactQueryDevtools,
        }),
    ),
)

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

function Providers({children}: { children: ReactNode}) {
    const [showDevtools, setShowDevtools] = React.useState(false);
    const queryClient = getQueryClient()

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.toggleDevtools = () => setShowDevtools((old) => !old)
    }, [])


    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                    {children}
                <ReactQueryDevtools initialIsOpen/>
                {showDevtools && (
                    <React.Suspense fallback={null}>
                        <ReactQueryDevtoolsProduction />
                    </React.Suspense>
                )}
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default Providers;