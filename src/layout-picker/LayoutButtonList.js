import React, { PropTypes, Component } from 'react';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts/layouts.css';
import LayoutButton from './LayoutButton';

const layoutCounts = [1, 2, 5, 5, 5];

export default class LayoutButtonList extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
    };

    render() {
        const { actions, tradesCount, layoutN } = this.props;

        return (
            <div className={styles.layoutBtnList}>
                {layoutCounts.map((count, idx) =>
                    sequence(layoutCounts[idx]).map(i =>
                        <LayoutButton
                            key={idx + '-' + i}
                            isActive={tradesCount === idx + 1 && layoutN === i + 1}
                            tradesCount={idx + 1}
                            layoutN={i + 1}
                            onClick={() => actions.changeActiveLayout(idx + 1, i + 1)}
                        />
                    )
                )}
            </div>
        );
    }
}
