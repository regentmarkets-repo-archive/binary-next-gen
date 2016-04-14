import React, { PropTypes, Component } from 'react';

const sequence = n => Array.from(new Array(n));

export default class LayoutButton extends Component {

    static propTypes = {
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    render() {
        const { tradesCount, layoutN, onClick } = this.props;
        return (
            <div className={`layout-btn layout-${tradesCount}-${layoutN}`} onClick={onClick}>
                {sequence(tradesCount).map((x, idx) =>
                    <div className="layout-mini" key={idx} />
                )}
            </div>
        );
    }
}
