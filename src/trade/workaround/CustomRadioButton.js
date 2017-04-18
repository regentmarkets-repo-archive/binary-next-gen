import React, { PureComponent } from 'react';

export default class CustomRadioButton extends PureComponent {
    props: {
        onClick: (e: SyntheticEvent) => void,
        selected: boolean,
        text: any,
        value: any,
    };

    onClicked = () => {
        const { value, onClick } = this.props;
        onClick({ target: { value } });
    };

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
