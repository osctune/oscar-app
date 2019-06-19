import React from 'react';

import Control from './Control';
import Report from './Report';
import Title from './Title';
import Stash from './Stash';

const App = (_props) => {
    return (
        <div className="layout">
            <Title/>
            <Control/>
            <Stash/>
            <Report/>
        </div>
    );
};

export default App;