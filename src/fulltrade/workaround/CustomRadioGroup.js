import React, { Component, PropTypes } from 'react';
import CustomRadioButton from './CustomRadioButton';

/**
 * This component is a workaround for problematic binding with input[type=radio]
 * The issue is open here
 * https://github.com/facebook/react/issues/5897
 */
export default class CustomRadioGroup extends Component {
    static propTypes = {
        options: PropTypes.array,
        onChange: PropTypes.func,
        value: PropTypes.any,
    };

    render() {
        const { options, onChange, value } = this.props;
        return (
            <div className="radio-selector">
                {options.map((opt, k) => (
                    <CustomRadioButton key={k} {...opt} onClick={onChange} selected={value === opt.value} />
                ))}
            </div>
        );
    }
}
