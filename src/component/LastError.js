import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import {
    ACTION_CREATE_URL_OK,
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
                return (
                    <div className="card" key={action.id}>
                        <a>{`${action.url} - ${action.reason}`}</a>
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