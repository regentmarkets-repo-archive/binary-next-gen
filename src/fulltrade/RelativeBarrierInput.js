import React, { PropTypes, Component } from 'react';
import { InputGroup } from '../_common';

export default class BarrierInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        defaultValue: PropTypes.any,
        onUnmount: PropTypes.func,
        value: PropTypes.number,
        spot: PropTypes.number,
    };

    render() {
        const { name, onChange, value, spot } = this.props;
        return (
            <div>
                <InputGroup
                    label={name + ' offset'}
                    type="number"
                    onChange={onChange}
                    value={value}
                />
                {spot && <p>{`Target spot: ${spot + value}`}</p>}
            </div>
        );
    }
}
