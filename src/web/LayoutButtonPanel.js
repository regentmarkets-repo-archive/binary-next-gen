import React, { PropTypes, Component } from 'react';
import LayoutButton from './LayoutButton';

const layoutCounts = [1, 2, 5, 5, 5];

const sequence = n => Array.from(new Array(n));

export default class LayoutButtonPanel extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="layout-btn-container">
                {layoutCounts.map((count, idx) =>
                    <div className="layout-btn-row" key={idx}>
                        <span className="layout-row-lbl">{idx + 1} trades</span>
                        {sequence(layoutCounts[idx]).map((n, i) =>
                            <LayoutButton key={i} tradesCount={idx + 1} layoutN={i + 1} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
