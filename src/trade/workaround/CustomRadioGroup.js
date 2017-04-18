import React, { PureComponent } from 'react';
import classnames from 'classnames';
import CustomRadioButton from './CustomRadioButton';

/**
 * This component is a workaround for problematic binding with input[type=radio]
 * The issue is open here
 * https://github.com/facebook/react/issues/5897
 */
export default class CustomRadioGroup extends PureComponent {
    props: {
        className: string,
        options: any[],
        onChange: (e: SyntheticEvent) => void,
        defaultValue: any,
    };

    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    onClick = (e: SyntheticEvent) => {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    };

    render() {
        const { className, options } = this.props;
        const { value } = this.state;
        return (
            <div className={classnames('radio-selector', className)}>
                {options.map((opt, k) => (
                    <CustomRadioButton
                        key={k}
                        {...opt}
                        onClick={this.onClick}
                        selected={value === opt.value}
                    />
                ))}
            </div>
        );
    }
}
