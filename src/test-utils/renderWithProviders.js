import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as TestingLibrary from '@testing-library/react';

/**
 * Custom render utility
 *
 * @template Q
 * @param {React.ReactElement<any>} ui
 * @param {TestingLibrary.RenderOptions<Q>} config
 * @returns {TestingLibrary.RenderResult<Q>}
 */
export default function renderWithProviders(
    ui,
    {
        queryClient = new QueryClient({
            defaultOptions: { queries: { staleTime: Infinity, retry: false } },
        }),
        wrapper: Wrapper = ({ children }) => <>{children}</>,
        ...restConfig
    } = {}
) {
    return TestingLibrary.render(ui, {
        ...restConfig,
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                <Wrapper>{children}</Wrapper>
            </QueryClientProvider>
        ),
    });
}
