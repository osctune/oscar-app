import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from './localStore';

import reducer, { initialState } from './reducer';
import { getPersistedState } from './selector';
import saga from './saga';

const initialize = () => {
    const sagaMiddleware = createSagaMiddleware();

    // Get persisted state.
    const persistedState = getPersistedState(loadState() || initialState());

    // Create redux store.
    const store = createStore(
        reducer,
        initialState(persistedState),   // Load previous state.
        applyMiddleware(sagaMiddleware) // Apply saga middleware.
    );
    
    if (module.hot) {
        // Enable hot reloading for reducer.
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
            saveState(getPersistedState(state));
            timeout = null;
        }, 1000);
    });

    return store;
};

export default initialize;