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

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import reducer from './reducer';
import saga from './saga';

// Bootstrap app.
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);

ReactDOM.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById('root'),
);