import React from 'react';

import ids from '../../ids';
import endpoints from '../../endpoints';

export default function Footer() {
    return (
        <footer
            role="contentinfo"
            id={ids.footer()}
            className="bg-slate-300 mt-auto px-4 py-4 text-sm flex flex-row gap-4 justify-between border-t border-t-slate-500 text-slate-900"
        >
            <div>
                Jokes provided by{' '}
                <a
                    className="underline"
                    href={endpoints.baseUri}
                    rel="noreferrer"
                    target="_blank"
                >
                    {endpoints.baseUri}
                </a>
            </div>
            <div>Code by Gunnar Gustafson</div>
        </footer>
    );
}
