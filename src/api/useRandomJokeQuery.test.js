import { rest } from 'msw';
import endpoints from '../endpoints';
import { server } from '../msw/server';

import { getJoke } from './useRandomJokeQuery';

describe('getJoke', () => {
    it('Rejects requests when the api call fails', async () => {
        server.use(
            rest.get(endpoints.getRandom(), (_req, res) => res.networkError())
        );

        await expect(getJoke()).rejects.toThrow();
    });

    it('Resolves requests with data object', async () => {
        const data = { foo: 'bar' };

        server.use(
            rest.get(endpoints.getRandom(), (_req, res, ctx) =>
                res(ctx.json(data))
            )
        );

        await expect(getJoke()).resolves.toStrictEqual(
            expect.objectContaining(data)
        );
    });
});
