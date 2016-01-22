import React, { PropTypes, Component } from 'react';
import { InputGroup } from '../_common';

export default class BarrierInput extends Component {
    static propTypes = {
        barrierType: PropTypes.oneOf(['relative', 'absolute']),
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        onUnmount: PropTypes.func,
        value: PropTypes.number,
        spot: PropTypes.number,
    };

    render() {
        const { barrierType, name, onChange, value, spot } = this.props;
        return (
            <div>
                <InputGroup
                    label={name + (barrierType === 'relative' ? ' offset' : '')}
                    type="number"
                    onChange={onChange}
                    value={value}
                />
                {(barrierType === 'relative' && spot) && <p>{`Target spot: ${spot + value}`}</p>}
            </div>
        );
    }
}
