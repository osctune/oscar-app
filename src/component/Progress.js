import React from 'react';
import { connect } from 'react-redux';

import { getPending } from '../selector';

const Progress = ({
    pending,
}) => {
    return (
        <div className="progress">
            <h3>Progress</h3>
            {pending.map(action => {
                return (
                    <div className="card" key={action.id}>
                        <a target="_blank" href={action.url}>{action.url}</a>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pending: getPending(state),
    };
};

export default connect(mapStateToProps)(Progress);