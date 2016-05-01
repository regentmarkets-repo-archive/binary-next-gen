import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class LayoutButton extends Component {

    static propTypes = {
        isActive: PropTypes.bool,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { isActive, tradesCount, layoutN, onClick } = this.props;
        const classes = classNames({
            [styles.layoutBtn]: true,
            [styles[`layout-${tradesCount}-${layoutN}`]]: true,
            [styles.active]: isActive,
		});
        const layout = layouts[`Layout${tradesCount}${layoutN}`];

        return (
            <div className={classes} onClick={onClick}>
                {layout(sequence(tradesCount).map(idx =>
                    <div className={styles.layoutMini} key={idx} />
                ))}
            </div>
        );
    }
}
