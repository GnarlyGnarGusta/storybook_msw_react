import React from 'react';
import content from '../../content';

const Skeleton = () => (
    <div
        role="presentation"
        className="block h-4 w-full animate-pulse bg-gray-300 rounded"
    />
);

export default function Loader() {
    return (
        <div>
            <p className="sr-only">{content.loading}</p>
            <div className="mb-2">
                <Skeleton />
            </div>
            <div>
                <Skeleton />
            </div>
        </div>
    );
}
