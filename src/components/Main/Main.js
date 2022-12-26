import React from 'react';

import useRandomJokeQuery from '../../api/useRandomJokeQuery';
import content from '../../content';
import ids from '../../ids';

import Error from './Error';
import Loader from './Loader';

export default function Main() {
    const { data, isFetching, isError, refetch } = useRandomJokeQuery();

    if (isFetching) {
        return <Loader />;
    }

    if (isError) {
        return <Error onRefetch={refetch} />;
    }

    return (
        <div>
            <dl className="mb-4" id={ids.joke(data.id)}>
                <dt className="mb-2">
                    <span className="font-bold">
                        <abbr title="Question">Q</abbr>:
                    </span>{' '}
                    <span>{data.setup}</span>
                </dt>
                <dd>
                    <span className="font-bold">
                        <abbr title="Answer">A</abbr>:
                    </span>{' '}
                    <span>{data.punchline}</span>
                </dd>
            </dl>
            <button
                className="rounded inline-block px-3 py-2 text-white bg-slate-800 font-semibold uppercase"
                type="button"
                id={ids.refetchButton()}
                onClick={refetch}
            >
                {content.refresh}
            </button>
        </div>
    );
}
