import React from 'react';

import { fireEvent, screen } from '@testing-library/react';
import { server } from '../../msw/server';
import { rest } from 'msw';
import randomJoke from '../../stubs/random_joke.json';

import renderWithProviders from '../../test-utils/renderWithProviders';

import Main from './Main';

import content from '../../content';
import endpoints from '../../endpoints';

describe('Main', () => {
    it('Displays loading state when fetching', async () => {
        renderWithProviders(<Main />);

        expect(screen.getByText(content.loading)).toBeInTheDocument();

        await expect(
            screen.findByTitle('Question')
        ).resolves.toBeInTheDocument();

        expect(screen.queryByText(content.loading)).not.toBeInTheDocument();
    });

    it('Fetches jokes, allows user to request another', async () => {
        server.use(
            rest.get(endpoints.getRandom(), (_req, res, ctx) => {
                return res.once(
                    ctx.json({
                        ...randomJoke,
                        setup: 'Mel',
                        punchline: 'Brooks',
                    })
                );
            }),
            rest.get(endpoints.getRandom(), (_req, res, ctx) => {
                return res(
                    ctx.json({
                        ...randomJoke,
                        setup: 'Richard',
                        punchline: 'Pryor',
                    })
                );
            })
        );

        renderWithProviders(<Main />);

        // When data is received
        await expect(screen.findByText('Mel')).resolves.toBeInTheDocument();
        expect(screen.getByText('Brooks')).toBeInTheDocument();

        // When data is refetched
        fireEvent.click(screen.getByText(content.refresh));

        // New data is received
        await expect(screen.findByText('Richard')).resolves.toBeInTheDocument();
        expect(screen.getByText('Pryor')).toBeInTheDocument();
    });

    it('Renders an error but allows user to retry the request', async () => {
        server.use(
            rest.get(endpoints.getRandom(), (_req, res, ctx) => {
                return res.once(ctx.status(500));
            }),
            rest.get(endpoints.getRandom(), (_req, res, ctx) => {
                return res(
                    ctx.json({
                        ...randomJoke,
                        setup: 'George',
                        punchline: 'Carlin',
                    })
                );
            })
        );

        renderWithProviders(<Main />);

        // When data is received
        await expect(
            screen.findByText(content.error)
        ).resolves.toBeInTheDocument();

        // When data is refetched
        fireEvent.click(screen.getByText(content.errorRetry));

        // New data is received
        await expect(screen.findByText('George')).resolves.toBeInTheDocument();
        expect(screen.getByText('Carlin')).toBeInTheDocument();
    });
});
