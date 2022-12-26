import { useQuery } from 'react-query';

import endpoints from '../endpoints';
import client from '../client';

import keys from './keys';

export const getJoke = async () => {
    try {
        const { data } = await client.get(endpoints.getRandom());

        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves random jokes from the API
 *
 * @param {import('react-query').UseQueryOptions} config
 * @returns {import('react-query').UseQueryResult<
 *  import('../defs/api').RandomJoke
 * >} A query resulte containing a random joke.
 */
export default function useRandomJokeQuery(config) {
    return useQuery(keys.randomJoke(), getJoke, config);
}
