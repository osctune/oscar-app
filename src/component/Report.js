import React from 'react';

import LastError from './LastError';
import Progress from './Progress';

const Report = (_props) => {
    return (
        <div className="report">
            <LastError/>
            <Progress/>
        </div>
    );
};

export default Report;