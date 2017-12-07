import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { sequence } from 'binary-utils';
import { actions } from '../_store';
import * as layouts from '../layouts';
import '../layouts/layouts.css';

export default class LayoutButton extends PureComponent {

    props: {
        isActive: boolean,
        tradesCount: number,
        layoutN: number,
        onClick: (e: SyntheticEvent) => void,
    };

    onClick = () => {
        const { tradesCount, layoutN, onClick } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
        if (onClick) onClick(tradesCount, layoutN);
    }

    render() {
        const { isActive, tradesCount, layoutN } = this.props;
        const classes = classNames({
            layoutBtn: true,
            [`layout-${tradesCount}-${layoutN}`]: true,
            active: isActive,
        });
        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const miniLayouts = sequence(tradesCount).map(idx =>
            <div className={'layoutMini'} key={idx} />
        );

        if (!layout) return null;

        return layout(miniLayouts, classes, this.onClick);
    }
}
