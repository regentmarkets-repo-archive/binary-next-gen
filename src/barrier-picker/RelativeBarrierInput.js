import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import InputGroup from '../_common/InputGroup';
import NumberPlain from '../_common/NumberPlain';

export default class BarrierInput extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        barrierType: PropTypes.oneOf(['relative', 'absolute']),
        expiryType: PropTypes.oneOf(['intraday', 'daily']),
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        onUnmount: PropTypes.func,
        pipSize: PropTypes.number,
        value: PropTypes.number,
        spot: PropTypes.number,
    };

    render() {
        const { barrierType, expiryType, name, onChange, pipSize, value, spot } = this.props;
        const relativeValue = expiryType === 'daily' ? spot && (value - spot) : value;
        const absoluteValue = expiryType === 'daily' ? value : spot && (value + spot);

        return (
            <div>
                <InputGroup
                    label={name + (barrierType === 'relative' ? ' offset' : '')}
                    type="number"
                    onChange={onChange}
                    value={barrierType === 'relative' ? relativeValue : absoluteValue}
                />
                {(barrierType === 'relative' && absoluteValue) &&
                    <p>Target spot: <NumberPlain value={absoluteValue} digits={pipSize} /></p>}
            </div>
        );
    }
}
