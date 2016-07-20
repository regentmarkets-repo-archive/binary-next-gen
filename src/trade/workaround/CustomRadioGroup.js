import React, { Component, PropTypes } from 'react';
import CustomRadioButton from './CustomRadioButton';
import classnames from 'classnames';

/**
 * This component is a workaround for problematic binding with input[type=radio]
 * The issue is open here
 * https://github.com/facebook/react/issues/5897
 */
export default class CustomRadioGroup extends Component {
    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.array,
        onChange: PropTypes.func,
        value: PropTypes.any,
    };

    render() {
        const { className, options, onChange, value } = this.props;
        return (
            <div className={classnames('radio-selector', className)}>
                {options.map((opt, k) => (
                    <CustomRadioButton key={k} {...opt} onClick={onChange} selected={value === opt.value} />
                ))}
            </div>
        );
    }
}
