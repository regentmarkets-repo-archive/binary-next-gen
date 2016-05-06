import React, { PropTypes, Component } from 'react';
import InputGroup from '../_common/InputGroup';
import M from '../_common/M';
import shouldPureComponentUpdate from 'react-pure-render/function';

const basises = ['payout', 'stake'];
const payouts = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
const step = 10;

export default class StakeCard extends Component {

    static propTypes = {
        amount: PropTypes.string.isRequired,
        basis: PropTypes.oneOf(basises).isRequired,
        // currency: PropTypes.string.isRequired,
        // id: PropTypes.number,
        onAmountChange: PropTypes.func.isRequired,     // both functions take the updated value instead of event object
        onBasisChange: PropTypes.func.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    stepUp() {
        const { amount, onAmountChange } = this.props;
        const newAmount = +amount + step;
        onAmountChange({ target: { value: newAmount.toString() } });
    }

    stepDown() {
        const { amount, onAmountChange } = this.props;
        const newAmount = +amount - step;
        onAmountChange({ target: { value: newAmount } });
    }

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
                <div>
                    <M m="Buy Price" className="label" />
                </div>
                <button className="btn-secondary" onClick={::this.stepDown}>&ndash;</button>
                <InputGroup
                    list="browsers"
                    type="number"
                    value={amount}
                    min={0.35}
                    max={100000}
                    step="0.01"
                    list="amounts"
                    onChange={onAmountChange}
                />
                <button className="btn-secondary" onClick={::this.stepUp}>+</button>
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
