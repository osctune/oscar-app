import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from './localStore';

import reducer from './reducer';
import saga from './saga';

const initialize = () => {
    const sagaMiddleware = createSagaMiddleware();

    // Create redux store.
    const store = createStore(
        reducer,
        loadState(),                    // Load previous state.
        applyMiddleware(sagaMiddleware) // Apply saga middleware.
    );
    
    // Enable hot reloading for reducer.
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(reducer);
        });
    }
    
    // Run saga.
    sagaMiddleware.run(saga);

    // Save to localStore after 1 second of inactivity.
    let timeout = null;
    store.subscribe(() => {
        const state = store.getState();
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            saveState(state);
            timeout = null;
        }, 1000);
    });

    return store;
};

export default initialize;