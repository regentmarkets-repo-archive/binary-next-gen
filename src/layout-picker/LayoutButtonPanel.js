import React, { PropTypes, Component } from 'react';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts/layouts.css';
import LayoutButton from './LayoutButton';

const layoutCounts = [1, 2, 6, 6, 6];

export default class LayoutButtonPanel extends Component {

    static propTypes = {
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onLayoutChange: PropTypes.func.isRequired,
    };

    render() {
        const { tradesCount, layoutN, onLayoutChange } = this.props;

        return (
            <div className={styles.layoutBtnContainer}>
                {layoutCounts.map((count, idx) =>
                    <div className={styles.layoutBtnRow} key={idx}>
                        <span className={styles.layoutRowLabel}>{idx + 1} trades</span>
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
