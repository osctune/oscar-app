import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import {
    ACTION_CREATE_URL_OK,
    ACTION_CREATE_URL_TIMEOUT,
} from '../constant';

import { getHistory } from '../selector';
import uniqueBy from '@nam3/oscar-util/uniqueBy';

const LastError = ({
    history,
}) => {
    const lastError = useMemo(() => uniqueBy(history.filter(action => action.type !== ACTION_CREATE_URL_OK), o => o.url).slice(0, 1), [history]);

    return (
        <div className="error">
            <h3>Last error</h3>
            {lastError.map(action => {
                const reason = action.type === ACTION_CREATE_URL_TIMEOUT ? 'Timeout' : action.reason;
                return (
                    <div className="card" key={action.id}>
                        <a>{`${reason} - ${action.url}`}</a>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        history: getHistory(state),
    };
};

export default connect(mapStateToProps)(LastError);