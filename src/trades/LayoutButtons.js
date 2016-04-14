import React, { PropTypes, Component } from 'react';

const layoutCounts = [1, 2, 5, 5, 7];
const layoutNames = layoutCounts.reduce((acc, x, i) => {
    const ns = Array.from(new Array(x)).map((n, idx) => `layout-${i}-${idx + 1}`);
    return acc.concat(ns);
}, []);

const sequence = n => Array.from(new Array(n));

export default class LayoutButtons extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="layout-btn-container">
                {layoutCounts.map((count, idx) =>
                    <div className="layout-btn-row" key={idx}>
                        <span className="layout-row-lbl">N of trades {idx + 1}</span>
                        {sequence(layoutCounts[idx]).map((n, i) =>
                            <div className={`layout-btn layout-${idx + 1}-${i + 1}`} key={i}>
                                {sequence(idx + 1).map((y, ii) =>
                                    <div className="layout-mini" key={ii} />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
