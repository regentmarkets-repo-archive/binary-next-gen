import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts.css';
import layoutData from '../_store/tradeLayoutData';


export default class LayoutButton extends Component {

    static propTypes = {
        isActive: PropTypes.bool,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { isActive, tradesCount, layoutN, onClick } = this.props;
        const contSize = tradesCount > 0 ? layoutData[tradesCount][layoutN] : undefined;
        const classes = classNames({
            [styles['layout-btn']]: true,
            [styles[`layout-${tradesCount}-${layoutN}`]]: true,
            active: isActive,
		});
        return (
            <div className={classes} onClick={onClick}>
             <div className={styles[`layout-container-${tradesCount}-${layoutN}-1`]}>
                {contSize && sequence(contSize.firstContainer).map(idx =>
                    <div className={styles['layout-mini']} key={idx} />
                )}
             </div>
             <div className={styles[`layout-container-${tradesCount}-${layoutN}-2`]}>
                {contSize && sequence(contSize.secondContainer).map(idx =>
                    <div className={styles['layout-mini']} key={idx} />
                )}
             </div>
            </div>
        );
    }
}
