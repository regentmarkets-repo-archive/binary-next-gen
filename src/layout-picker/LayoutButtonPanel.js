import React, { PropTypes, Component } from 'react';
import sequence from 'binary-utils/lib/sequence';
import LayoutButton from './LayoutButton';

const layoutCounts = [1, 2, 5, 5, 5];

export default class LayoutButtonPanel extends Component {

    static propTypes = {
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onLayoutChange: PropTypes.func.isRequired,
    };

    render() {
        const { tradesCount, layoutN, onLayoutChange } = this.props;

        return (
            <div className="layout-btn-container">
                {layoutCounts.map((count, idx) =>
                    <div className="layout-btn-row" key={idx}>
                        <span className="layout-row-lbl">{idx + 1} trades</span>
                        {sequence(layoutCounts[idx]).map(i =>
                            <LayoutButton
                                key={i}
                                isActive={tradesCount === idx + 1 && layoutN === i + 1}
                                tradesCount={idx + 1}
                                layoutN={i + 1}
                                onClick={() => onLayoutChange(idx + 1, i + 1)}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
