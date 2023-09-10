import React from 'react';
import Header from './features/Header/Header.jsx';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route exact path='/' element={
        <div>
            <Header/>
            <main>
                <Home/>
                <Subreddits/>
            </main>
        </div>
    }>
        <Route path='/r/:name' element={ <Subreddits/> }/>
    </Route>
))

function App() {
    return <RouterProvider router={appRouter}/>
};

export default App;
