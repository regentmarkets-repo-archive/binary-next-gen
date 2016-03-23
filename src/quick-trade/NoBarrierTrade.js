import React, { Component, PropTypes } from 'react';
import Collapsible from '../containers/Collapsible';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import RadioGroup from '../_common/RadioGroup';
import LabeledText from '../_common/LabeledText';
import PurchaseFailed from '../_common/PurchaseFailed';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';
import Modal from '../containers/Modal';
import * as LiveData from '../_data/LiveData';

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
        receipt: PropTypes.object,
        failure: PropTypes.object,
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
        const newV = e.target.value;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { duration: newV });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    onPayoutUpdate(e) {
        const { tradeInfo, actions } = this.props;
        const newV = e.target.value;
        actions.updateQuickTradeParams(tradeInfo.underlying_symbol, tradeInfo.contract_type, { amount: newV });
        actions.updateQuickTradePriceProposalSubscription(tradeInfo.underlying_symbol, tradeInfo.contract_type);
    }

    onPurchaseClick() {
        const { proposal, actions, tradeInfo } = this.props;
        LiveData.api.buyContract(proposal.id, proposal.ask_price)
            .then(
                receipt =>
                    actions.setQuickTradeField(
                        tradeInfo.underlying_symbol,
                        tradeInfo.contract_type,
                        'receipt',
                        receipt.buy
                    ),
                error =>
                    actions.setQuickTradeField(
                        tradeInfo.underlying_symbol,
                        tradeInfo.contract_type,
                        'failure',
                        error
                    )
            );
    }

    closeModal(type, actions, tradeInfo) {
        actions.setQuickTradeField(
                                tradeInfo.underlying_symbol,
                                tradeInfo.contract_type,
                                type,
                                null
                            );
    }

    render() {
        const { tradeInfo, params, proposal, receipt, actions, failure } = this.props;

        return (
            <div>
                <Modal
                    shown={!!failure}
                    onClose={this.closeModal('failure', actions, tradeInfo)}
                >
                    {failure && <PurchaseFailed failure={failure} />}
                </Modal>
                <Modal
                    shown={!!receipt}
                    onClose={this.closeModal('receipt', actions, tradeInfo)}
                >
                    {receipt &&
                        <PurchaseConfirmation
                            receipt={receipt}
                            onClose={this.closeModal('receipt', actions, tradeInfo)}
                        />
                    }
                </Modal>
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
                        value={params && params.amount}
                    />
                    {proposal && <LabeledText label="Price" value={proposal.ask_price} />}
                    <button onClick={::this.onPurchaseClick}>
                        <M m="Purchase" />
                    </button>
                </Collapsible>
            </div>
        );
    }
}
