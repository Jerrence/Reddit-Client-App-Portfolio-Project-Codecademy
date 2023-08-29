import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from './App.js';
import store from './store/store';
import './index.css';

ReactDOM.render(
    // React.StrictMode checks over our react code and helps us debug them by returning warnings and errors
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);