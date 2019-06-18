import React from 'react';
import { connect } from 'react-redux';

import {
    ACTION_CREATE_URL_OK,
} from './constant';

import { createUrl, inputUrl } from './action';
import { getPending, getHistory, getInputUrl, getStash } from './selector';
import uniqueBy from '@nam3/oscar-util/uniqueBy';

const App = ({
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

    const lastError = uniqueBy(history.filter(action => action.type !== ACTION_CREATE_URL_OK), o => o.url).slice(0, 1);

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
                <h3>Stash {stash.length === 10 ? `limit of ${10} reached ` : `${10 - stash.length} more to go...`}</h3>
                {stash.map(action => {
                    return (
                        <div className="card" key={action.id}>
                            <a target="_blank" href={action.url}>{action.url}</a>
                            <a target="_blank" href={action.target}>{action.target}</a>
                        </div>
                    );
                })}
            </div>
            <div className="report">
                <div className="error">
                    <h3>Last error</h3>
                    {lastError.map(action => {
                        return (
                            <div className="card" key={action.id}>
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
                            <div className="card" key={action.id}>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);