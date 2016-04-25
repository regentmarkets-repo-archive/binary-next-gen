import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import sequence from 'binary-utils/lib/sequence';

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
            'layout-btn': true,
            [`layout-mini-${tradesCount}-${layoutN}`]: true,
            active: isActive,
		});

        return (
            <div className={classes} onClick={onClick}>
                {sequence(tradesCount).map(idx =>
                    <div className="layout-mini" key={idx} />
                )}
            </div>
        );
    }
}
