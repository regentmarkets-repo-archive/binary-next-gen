import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import { actions } from '../_store';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class LayoutButton extends PureComponent {

    static propTypes = {
        isActive: PropTypes.bool,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onClick: PropTypes.func,
    };

    onClick = () => {
        const { tradesCount, layoutN, onClick } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
        if (onClick) onClick(tradesCount, layoutN);
    }

    render() {
        const { isActive, tradesCount, layoutN } = this.props;
        const classes = classNames({
            [styles.layoutBtn]: true,
            [styles[`layout-${tradesCount}-${layoutN}`]]: true,
            [styles.active]: isActive,
		});
        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const miniLayouts = sequence(tradesCount).map(idx =>
            <div className={styles.layoutMini} key={idx} />
        );

        return layout(miniLayouts, classes, this.onClick);
    }
}
