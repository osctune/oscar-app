import React from 'react';
import { connect } from 'react-redux';

import { getStash } from '../selector';

const Stash = ({
    stash,
}) => {
    return (
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
    );
};

const mapStateToProps = (state) => {
    return {
        stash: getStash(state),
    };
};

export default connect(mapStateToProps)(Stash);