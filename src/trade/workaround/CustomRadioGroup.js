import React, { PureComponent, PropTypes } from 'react';
import CustomRadioButton from './CustomRadioButton';
import classnames from 'classnames';

/**
 * This component is a workaround for problematic binding with input[type=radio]
 * The issue is open here
 * https://github.com/facebook/react/issues/5897
 */
export default class CustomRadioGroup extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.array,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    onClick = e => {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    }

    render() {
        const { className, options } = this.props;
        const { value } = this.state;
        return (
            <div className={classnames('radio-selector', className)}>
                {options.map((opt, k) => (
                    <CustomRadioButton key={k} {...opt} onClick={this.onClick} selected={value === opt.value} />
                ))}
            </div>
        );
    }
}
