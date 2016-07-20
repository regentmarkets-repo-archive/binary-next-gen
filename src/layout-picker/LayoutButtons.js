import React, { Component } from 'react';
import styles from '../layouts/layouts.css';
import { layoutNames } from './layouts';

export default class LayoutButtons extends Component {

    render() {
        return (
            <div className="buttons">
                {layoutNames.map((x, idx) =>
                    <div key={x} className={styles[x]}>
                        {Array.from(new Array(layoutCounts[idx])).map((y, i) =>
                            <div style={{ backgroundColor: 'red', with: 10, height: 10 }} key={i} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
