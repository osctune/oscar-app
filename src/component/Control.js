import React from 'react';
import { connect } from 'react-redux';

import { createUrl, inputUrl } from '../action';
import { getInputUrl, } from '../selector';

const Control = ({
    url,
    inputUrl,
    createUrl,
}) => {
    const handleChangeUrl = e => {
        inputUrl(e.target.value);
    };

    const handleCreateUrl = e => {
        e.preventDefault();
        createUrl(url);
    };

    return (
        <div className="control">
            <form onSubmit={handleCreateUrl}>
                <input type="text" value={url} onChange={handleChangeUrl} />
                <input type="submit" value="Submit" disabled={url.length === 0} />
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        url: getInputUrl(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        inputUrl: url => dispatch(inputUrl(url)),
        createUrl: url => dispatch(createUrl({ url })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);