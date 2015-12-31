import React, { Component, PropTypes } from 'react';
import { Collapsible, InputGroup, RadioGroup, LabeledText } from '../_common';

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
        proposal: PropTypes.object,
    };

    componentWillMount() {
        const { tradeInfo, actions, currency } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, {
            basis: 'payout',
            contract_type: tradeInfo.contract_type,
            currency,
            duration: 5,
            amount: 10,
            duration_unit: 't',
            symbol: tradeInfo.underlying_symbol,
        });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    onChangeBasis(e) {
        const { tradeInfo, actions } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { basis: e.target.value });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    onDurationUpdates(e) {
        const { tradeInfo, actions } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { duration: e.target.value });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    onPayoutUpdate(e) {
        const { tradeInfo, actions } = this.props;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { amount: e.target.value });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    render() {
        const { tradeInfo, params, proposal } = this.props;
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
                {proposal && <LabeledText label="Price" value={proposal.ask_price} />}
                <button>Purchase</button>
            </Collapsible>
        );
    }
}
