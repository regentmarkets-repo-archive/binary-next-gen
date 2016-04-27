import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts.css';

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
            [styles['layout-btn']]: true,
            [styles[`layout-${tradesCount}-${layoutN}`]]: true,
            active: isActive,
		});

        return (
            <div className={classes} onClick={onClick}>
                {sequence(tradesCount).map(idx =>
                    <div className={styles['layout-mini']} key={idx} />
                )}
            </div>
        );
    }
}
