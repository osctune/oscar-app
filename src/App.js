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
import { getPending, getHistory, getInputUrl, getStash } from './selector';

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
    stash,
}) => {
    const handleChangeUrl = e => {
        inputUrl(e.target.value);
    };

    const handleCreateUrl = e => {
        e.preventDefault();
        createUrl(url);
    };

    return (
        <div className="layout">
            <div className="title">
                <h1>OSCAR</h1>
                <h2>Open Source Concurrent Address Reducer</h2>
            </div>
            <div className="control">
                <form onSubmit={handleCreateUrl}>
                    <input type="text" value={url} onChange={handleChangeUrl} />
                    <input type="submit" value="Submit" disabled={url.length === 0} />
                </form>
            </div>
            <div className="stash">
                <h3>Stash</h3>
                {stash.map(action => {
                    return (
                        <div className="card" key={action.id}>
                            <span>{action.id}</span>
                            <a href={action.url}>{action.url}</a>
                            <pre>
                                {JSON.stringify(action, null, 4)}
                            </pre>
                        </div>
                    );
                })}
            </div>
            <div className="report">
                <div className="error">
                    <h3>Last error</h3>
                    {history.filter(action => action.type !== ACTION_CREATE_URL_OK).slice(0, 1).map(action => {
                        return (
                            <div key={action.id}>
                                <div>{action.url}</div>
                                <div>{action.reason}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="progress">
                    <h3>Progress</h3>
                    {pending.map(action => {
                        return (
                            <div key={action.id}>
                                {action.url}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        url: getInputUrl(state),
        pending: getPending(state),
        history: getHistory(state),
        stash: getStash(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        inputUrl: url => dispatch(inputUrl(url)),
        createUrl: url => dispatch(createUrl({ url })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Url);