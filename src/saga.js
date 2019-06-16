import { take, takeEvery, race, delay, put, call, fork, cancelled } from 'redux-saga/effects';

import { createUrl as fetchCreateUrl } from './api';

import {
    ACTION_CREATE_URL,
    ACTION_CREATE_URL_OK,
    ACTION_CREATE_URL_FAIL,
    ACTION_CREATE_URL_CANCEL,
    ACTION_CREATE_URL_TIMEOUT,
} from './constant';

import {
    createUrlOk,
    createUrlFail,
    createUrlCancel,
    createUrlTimeout,
} from './action';

function* createUrl(action) {
    try {
        // Make request.
        const { response, timeout } = yield race({
            response: call(fetchCreateUrl, action.url),
            timeout: delay(10000),
        });
        if (timeout) {
            // Client-side timeout.
            yield put(createUrlTimeout(action));
            return;
        }
        //  We got the url!
        yield put(createUrlOk({
            id: action.id,
            url: response,
            target: action.url,
        }));
    } catch (err) {
        // Error.
        yield put(createUrlFail(action));
    } finally {
        if (yield cancelled()) {
            // Canceled.
            yield put(createUrlCancel(action));
        }
    }
}

function* createUrlFlow(action) {
    // Start task.
    const task = yield fork(createUrl, action);

    // Wait for completion.
    while(true) {
        // Take any of these actions.
        const endAction = yield take(
            ACTION_CREATE_URL_TIMEOUT,
            ACTION_CREATE_URL_CANCEL,
            ACTION_CREATE_URL_OK,
            ACTION_CREATE_URL_FAIL,
        );

        // Does the action have our id?
        if(endAction.id === action.id) {

            // Is it a cancel action?
            if(endAction.type === ACTION_CREATE_URL_CANCEL) {
                // Cancel the task.
                yield cancel(task);
            }

            // Break from loop.
            break;
        }
    }
}

function* saga() {
    // Listen for ACTION_CREATE_URL and start a new flow when encountered.
    yield takeEvery(ACTION_CREATE_URL, createUrlFlow);
}

export default saga;