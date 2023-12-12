import {render} from '@testing-library/react'
import * as React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";


const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: 5,
        }
    }
})

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const {rerender, ...result} = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    )
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    }
}

export const createWrapper = ({children}: { children: React.ReactNode }) => {
    // ✅ creates a new QueryClient for each test
    const queryClient = new QueryClient();
    // eslint-disable-next-line react/display-name
    return (
        <MemoryRouterProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MemoryRouterProvider>
    )
}