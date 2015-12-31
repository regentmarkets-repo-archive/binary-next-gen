import React, { Component, PropTypes } from 'react';
import { Collapsible, InputGroup, RadioGroup } from '../_common';

const basisTypes = [
    { value: 'payout', text: 'Payout' },
    { value: 'stake', text: 'Stake' },
];

export default class NoBarrierTrade extends Component {
    static propTypes = {
        tradeInfo: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        params: PropTypes.object,
        currency: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { tradeInfo, actions, currency } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, {
            basis: 'payout',
            contract_type: tradeInfo.contract_type,
            currency,
            duration_unit: 't',
            symbol: tradeInfo.underlying_symbol,
        });
    }

    onChangeBasis(e) {
        const { tradeInfo, actions } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { basis: e.target.value });
    }

    onDurationUpdates(e) {
        const { tradeInfo, actions } = this.props;
        console.log(tradeInfo);
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { duration: e.target.value });
    }

    onPayoutUpdate(e) {
        const { tradeInfo, actions } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { amount: e.target.value });
    }

    render() {
        const { tradeInfo, params } = this.props;
        return (
            <Collapsible title={tradeInfo.contract_display} >
                <RadioGroup
                    name={tradeInfo.contract_type}
                    options={basisTypes}
                    onChange={::this.onChangeBasis}
                    value={params && params.basis}
                />
                <InputGroup
                    type="number"
                    label="Ticks"
                    onChange={::this.onDurationUpdates}
                    value={params && params.duration}
                />
                <InputGroup
                    type="number"
                    label="Payout"
                    onChange={::this.onPayoutUpdate}
                    value={params && params.payout}
                />
                <button>Purchase</button>
            </Collapsible>
        );
    }
}
