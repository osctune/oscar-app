import uid from 'uuid/v4';

import {
    ACTION_INPUT_URL,
    ACTION_CREATE_URL,
    ACTION_CREATE_URL_OK,
    ACTION_CREATE_URL_FAIL,
    ACTION_CREATE_URL_CANCEL,
    ACTION_CREATE_URL_TIMEOUT,
} from './constant';

// Update user url input.
export const inputUrl = (url) => ({
    type: ACTION_INPUT_URL,
    url,
});

// Initiate create url flow.
export const createUrl = ({ url, id = uid() }) => ({
    type: ACTION_CREATE_URL,
    id,
    url,
});

// End create url flow with an OK.
export const createUrlOk = ({ url, target, id }) => ({
    type: ACTION_CREATE_URL_OK,
    id,
    url,
    target,
});

// End create url flow with a FAIL.
export const createUrlFail = ({ url, id, reason }) => ({
    type: ACTION_CREATE_URL_FAIL,
    id,
    url,
    reason,
});

// Cancel a create url flow.
export const createUrlCancel = ({ url, id }) => ({
    type: ACTION_CREATE_URL_CANCEL,
    id,
    url,
});

// Indicate that the create url flow timed out.
export const createUrlTimeout = ({ url, id }) => ({
    type: ACTION_CREATE_URL_TIMEOUT,
    id,
    url,
});