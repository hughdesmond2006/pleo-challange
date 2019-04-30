import React from 'react';

import styles from './Spinner.module.scss'

const spinner = () => (
    <div className={styles.spinner}>
        <div className={styles.ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    );

export default spinner;
