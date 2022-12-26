import React from 'react';

import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from 'react-query';

import handlers from '../src/msw/handlers';

import '../src/main.css';

/**
 * Read more about the Mock Service Worker addon
 * https://storybook.js.org/addons/msw-storybook-addon
 */
initialize();

export const decorators = [
    // Decorates stories with MSW
    mswDecorator,
    /**
     * @type {import('@storybook/react').DecoratorFn}
     */
    (
        Story,
        {
            parameters: {
                queryClient = new QueryClient({
                    defaultOptions: {
                        queries: {
                            staleTime: Infinity,
                            retry: false,
                        },
                    },
                }),
            },
        }
    ) => {
        return (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        );
    },
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    /**
     * Handles default requests
     */
    msw: {
        handlers: {
            jokes: handlers,
        },
    },
};
