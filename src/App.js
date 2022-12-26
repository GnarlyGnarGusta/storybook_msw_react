import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

import content from './content';
import ids from './ids';

function App() {
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full md:max-w-screen-md mx-auto mb-6 px-4">
                <a
                    className="sr-only"
                    id={ids.skipLink()}
                    href={`#${ids.mainContent()}`}
                >
                    {content.skip}
                </a>
                <Header />
                <main id={ids.mainContent()}>
                    <Main />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;
