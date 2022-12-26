import React from 'react';

import content from '../../content';

export default function Header() {
    return (
        <header className="py-4">
            <h1 className="text-xl font-black">{content.header}</h1>
        </header>
    );
}
