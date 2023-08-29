import React from 'react';
import Header from './features/Header/Header.jsx';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';
// We will use these imports later
// import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
    return (
        <>
            <Header/>
            <main>
                <Home/>
            </main>

            {
                /*
                    The aside tag is related to the main tag in semantic HTML,
                    and is used as a sidebar toward the right side of the web
                */
            }

            <aside>
                <Subreddits/>
            </aside>
        </>
    );
};

export default App;
