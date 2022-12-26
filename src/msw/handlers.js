import { rest } from 'msw';
import endpoints from '../endpoints';

import randomJoke from '../stubs/random_joke.json';

const handlers = [
    rest.get(endpoints.getRandom(), (_req, res, ctx) =>
        res(ctx.json(randomJoke))
    ),
];

export default handlers;
