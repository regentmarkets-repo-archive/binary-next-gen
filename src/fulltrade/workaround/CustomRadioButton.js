import React, { Component, PropTypes } from 'react';

export default class CustomRadioButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        text: PropTypes.any,
        value: PropTypes.any,
    };

    render() {
        const { text, value, onClick, selected } = this.props;

        return (
            <button
                className={'radio-button ' + (selected && 'selected-radio')}
                onClick={() => onClick({ target: { value } })}
            >
                {text}
            </button>
        );
    }
}
