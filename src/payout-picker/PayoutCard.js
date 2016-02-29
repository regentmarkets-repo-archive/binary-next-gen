import React, { PropTypes, Component } from 'react';
import InputGroup from '../_common/InputGroup';
import CollapsibleFormSnippet from '../containers/CollapsibleFormSnippet';
import shouldPureComponentUpdate from 'react-pure-render/function';

const basises = ['payout', 'stake'];
const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];

export default class PayoutCard extends Component {

    static propTypes = {
        amount: PropTypes.number.isRequired,
        basis: PropTypes.oneOf(basises).isRequired,
        // currency: PropTypes.string.isRequired,
        // id: PropTypes.number,
        onAmountChange: PropTypes.func.isRequired,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { amount, onAmountChange } = this.props;
        // const basisOptions = basises.map(i => ({ text: i, value: i }));
        // const payoutOptions = payouts.map(i => ({ text: i, value: i }));
        return (
            <div className="payout-picker">
                {/* <RadioGroup
                    className="radio-selector"
                    name={'basis' + id}
                    options={basisOptions}
                    onChange={onBasisChange}
                    value={basis}
                /> */}
                <button className="btn-secondary">&ndash;</button>
                <InputGroup
                    type="number"
                    defaultValue={amount}
                    min={0.35}
                    max={100000}
                    step={1}
                    list="amounts"
                    onChange={onAmountChange}
                />
                <button className="btn-secondary">+</button>
                <datalist id="amounts">
                    {payouts.map(x =>
                        <option
                            key={'stake' + x}
                            value={x}
                        />
                    )}
                </datalist>
            </div>
        );
    }
}
