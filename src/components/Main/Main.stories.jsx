import { rest } from 'msw';
import React from 'react';
import endpoints from '../../endpoints';

import Main from './Main';

import randomJoke from '../../stubs/random_joke.json';

export default {
    title: 'Main',
    component: Main,
};

const Template = () => <Main />;

export const SuccessfulRequest = Template.bind({});

export const DelayedLoaders = Template.bind({});
DelayedLoaders.parameters = {
    msw: {
        handlers: {
            jokes: [
                rest.get(endpoints.getRandom(), (_req, res, ctx) =>
                    res(ctx.delay(1000), ctx.json(randomJoke))
                ),
            ],
        },
    },
};

export const ErrorRetrievingInitially = Template.bind({});
ErrorRetrievingInitially.parameters = {
    msw: {
        handlers: {
            jokes: [
                rest.get(endpoints.getRandom(), (_req, res, ctx) =>
                    res.once(ctx.status(500))
                ),
                rest.get(endpoints.getRandom(), (_req, res, ctx) =>
                    res(ctx.delay(500), ctx.json(randomJoke))
                ),
            ],
        },
    },
};
