import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class LayoutButton extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        isActive: PropTypes.bool,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    onClick = () => {
        const { actions, tradesCount, layoutN } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
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
