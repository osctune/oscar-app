import './style/index.scss';

// npm WARN deprecated @babel/polyfill@7.4.4: 🚨 As of Babel 7.4.0, this
// npm WARN deprecated package has been deprecated in favor of directly
// npm WARN deprecated including core-js/stable (to polyfill ECMAScript
// npm WARN deprecated features) and regenerator-runtime/runtime
// npm WARN deprecated (needed to use transpiled generator functions):
// npm WARN deprecated 
// npm WARN deprecated   > import "core-js/stable";
// npm WARN deprecated   > import "regenerator-runtime/runtime";
import 'core-js/stable'; // Polyfill.
import 'regenerator-runtime/runtime'; // Needed for redux-saga.

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';

import createStore from './createStore';
import App from './App';

// Bootstrap app.
const store = createStore();

ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root'),
);

// Enable hot reloading for App.js
module.hot.accept('./App.js', () => {
    ReactDOM.render(
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>,
        document.getElementById('root'),
    );
});