import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class LayoutButton extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

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
        const miniLayouts = sequence(tradesCount).map(idx =>
            <div className={styles.layoutMini} key={idx} />
        );

        return layout(miniLayouts, classes, onClick);
    }
}
