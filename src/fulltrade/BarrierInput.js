import React, { PropTypes, Component } from 'react';
import { InputGroup } from '../_common';

export default class BarrierInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any,
        onUnmount: PropTypes.func,
    };

    render() {
        const { name, defaultValue, onChange } = this.props;
        return (
            <InputGroup
                label={name}
                defaultValue={+defaultValue}
                type="number"
                onChange={onChange}
            />
        );
    }
}
