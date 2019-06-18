import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';

const initialize = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    );
    
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(reducer);
        });
    }
    
    sagaMiddleware.run(saga);

    return store;
};

export default initialize;