import React from 'react';
import PropTypes from 'prop-types';

import content from '../../content';

const ErrorProps = {
    /**
     * Retries the request
     */
    onRefetch: PropTypes.func.isRequired,
};

/**
 * @param {PropTypes.InferProps<ErrorProps>} props
 * @returns {JSX.Element}
 */
export default function Error({ onRefetch }) {
    return (
        <div className="rounded bg-red-800 text-white px-3 py-2 flex flex-row justify-between gap-4">
            <div>{content.error}</div>
            <button
                type="button"
                className="underline underline-offset-1"
                onClick={onRefetch}
            >
                {content.errorRetry}
            </button>
        </div>
    );
}

Error.propTypes = ErrorProps;
