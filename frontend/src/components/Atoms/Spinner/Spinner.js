import React from 'react';

import './Spinner.scss'

const spinner = () => (
    <div className={'spinner'}>
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    );

export default spinner;
