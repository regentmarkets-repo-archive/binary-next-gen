import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts/layouts.css';
import LayoutButton from './LayoutButton';

const layoutCounts = [2, 6, 6, 6];

export default class LayoutButtonPanel extends PureComponent {

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
                        <div className={styles.layoutRowLabel}>
                            {idx + 2}
                            &nbsp;
                            <M m="trades" />
                        </div>
                        {sequence(layoutCounts[idx]).map(i =>
                            <LayoutButton
                                key={i}
                                isActive={tradesCount === idx + 2 && layoutN === i + 1}
                                tradesCount={idx + 2}
                                layoutN={i + 1}
                                onClick={() => onLayoutChange(idx + 2, i + 1)}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
