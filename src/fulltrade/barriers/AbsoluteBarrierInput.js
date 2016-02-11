import React, { Component, PropTypes } from 'react';
import InputGroup from '../_common/InputGroup';

export default class AbsoluteBarrierInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any,
        onUnmount: PropTypes.func,
        value: PropTypes.number,
    };

    render() {
        const { name, onChange, value } = this.props;
        return (
            <div>
                <InputGroup
                    label={name}
                    type="number"
                    onChange={onChange}
                    value={value}
                />
            </div>
        );
    }
}
