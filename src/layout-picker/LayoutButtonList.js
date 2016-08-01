import React, { PropTypes, PureComponent } from 'react';
import styles from '../layouts/layouts.css';
import LayoutButton from './LayoutButton';
import { layoutNumbers } from './layouts';

export default class LayoutButtonList extends PureComponent {

    static propTypes = {
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
    };

    render() {
        const { tradesCount, layoutN } = this.props;

        return (
            <div className={styles.layoutBtnList}>
                {layoutNumbers().map(x =>
                    <LayoutButton
                        key={`${x.trade}-${x.layout}`}
                        isActive={tradesCount === x.trade && layoutN === x.layout}
                        tradesCount={x.trade}
                        layoutN={x.layout}
                    />
                )}
            </div>
        );
    }
}
