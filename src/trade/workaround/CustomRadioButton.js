import React, { Component, PropTypes } from 'react';

export default class CustomRadioButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        text: PropTypes.any,
        value: PropTypes.any,
    };

    onClicked = () => {
        const { value, onClick } = this.props;
        onClick({ target: { value } });
    }

    render() {
        const { text, selected } = this.props;

        return (
            <button
                className={'radio-button ' + (selected && 'selected-radio')}
                onClick={this.onClicked}
            >
                {text}
            </button>
        );
    }
}
