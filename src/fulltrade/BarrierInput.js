import React, { PropTypes, Component } from 'react';
import { InputGroup } from '../_common';

export default class BarrierInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.any,
        onUnmount: PropTypes.func,
    };

    render() {
        const { name, value, onChange } = this.props;
        return (
            <InputGroup
                label={name}
                defaultValue={+value}
                type="number"
                onChange={onChange}
            />
        );
    }
}
