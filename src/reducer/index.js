import {
    ACTION_INPUT_URL,
    ACTION_CREATE_URL,
    ACTION_CREATE_URL_OK,
    ACTION_CREATE_URL_FAIL,
    ACTION_CREATE_URL_CANCEL,
    ACTION_CREATE_URL_TIMEOUT,
} from '../constant';

import { removeById } from '../util';

// App initial state.
const initialState = () => ({
    url: '',
    pending: [],
    stash: [],
    history: [],
});

const reducer = (state = initialState(), action) => {
    switch(action.type) {
        // Store user input.
        case ACTION_INPUT_URL:
            return {
                ...state,
                url: action.url,
            };
        // Add action to pending queue.
        case ACTION_CREATE_URL:
            return {
                ...state,
                pending: [action, ...state.pending],
            };
        // Success, remove action from pending queue and add to stash and history list.
        case ACTION_CREATE_URL_OK:
            return {
                ...state,
                stash: [action, ...state.stash.filter(o => o.url !== action.url)].slice(0, 10),
                history: [action, ...state.history],
                pending: removeById(state.pending, action),
            };
        // Failed, remove action from pending queue and add to history list.
        case ACTION_CREATE_URL_FAIL:
            return {
                ...state,
                history: [action, ...state.history],
                pending: removeById(state.pending, action),
            };
        // Canceled, remove action from pending queue and add to history list.
        case ACTION_CREATE_URL_CANCEL:
            return {
                ...state,
                history: [action, ...state.history],
                pending: removeById(state.pending, action),
            };
        // Timed out, remove action from pending queue and add to history list.
        case ACTION_CREATE_URL_TIMEOUT:
            return {
                ...state,
                history: [action, ...state.history],
                pending: removeById(state.pending, action),
            };
        default:
            return state;
    }
};

export default reducer;