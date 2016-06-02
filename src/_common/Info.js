import React, { Component, PropTypes } from 'react';

export default class Clock extends Component {

    static propTypes = {
        tooltip: PropTypes.string,
    };

    render() {
        const { tooltip } = this.props;

        return (
            <span>
                <img
                    className="info-icon"
                    src="img/info.svg"
                    role="presentation"
                />
                {tooltip && <div className="tooltip">{tooltip}</div>}
            </span>
        );
    }
}
