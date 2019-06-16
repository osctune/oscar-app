import React from 'react';
import { connect } from 'react-redux';

import {
    ACTION_CREATE_URL,
    ACTION_CREATE_URL_CANCEL,
    ACTION_CREATE_URL_OK,
    ACTION_CREATE_URL_TIMEOUT,
    ACTION_CREATE_URL_FAIL
} from './constant';

import { createUrl, inputUrl } from './action';
import { getPending, getHistory, getInputUrl } from './selector';

// const statusByType = {
//     [ACTION_CREATE_URL]: 'Pending',
//     [ACTION_CREATE_URL_CANCEL]: 'Canceled',
//     [ACTION_CREATE_URL_OK]: 'Ok',
//     [ACTION_CREATE_URL_TIMEOUT]: 'Timeout',
//     [ACTION_CREATE_URL_FAIL]: 'Failed',
// };

const Url = ({
    url,
    inputUrl,
    createUrl,
    history,
    pending,
}) => {
    const handleChangeUrl = e => {
        inputUrl(e.target.value);
    };

    const handleCreateUrl = e => {
        e.preventDefault();
        createUrl(url);
    };

    return (
        <div>
            <div>
                Pending
                {pending.map(action => {
                    return (
                        <div key={action.id}>
                            {action.url}
                        </div>
                    );
                })}
            </div>
            <form onSubmit={handleCreateUrl}>
                <input type="text" value={url} onChange={handleChangeUrl} />
                <input type="submit" value="Submit" />
            </form>
            <div>
                History
                {history.filter(action => action.type === ACTION_CREATE_URL_OK).map(action => {
                    return (
                        <div key={action.id}>
                            <a href={action.url}>{action.url}</a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        url: getInputUrl(state),
        pending: getPending(state),
        history: getHistory(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        inputUrl: url => dispatch(inputUrl(url)),
        createUrl: url => dispatch(createUrl({ url })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Url);