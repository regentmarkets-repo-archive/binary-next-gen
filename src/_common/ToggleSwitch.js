import React, { Component, PropTypes } from 'react';

export default class ToggleSwitch extends Component {

    static propTypes = {
        checked: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
    };

    static defaultProps = {
        checked: false,
    };

    render() {
        const { checked, onClick, text } = this.props;

        return (
            <div className="switch">
                <input
                    id="switch-1"
                    type="checkbox"
                    className="switch-input"
                    checked={checked}
                    onClick={onClick}
                />
                <label htmlFor="switch-1" className="switch-label">
                    {text}
                </label>
            </div>
        );
    }
}
