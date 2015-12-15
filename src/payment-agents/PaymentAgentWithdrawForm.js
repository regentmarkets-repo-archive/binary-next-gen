import React, { PropTypes } from 'react';
import { ErrorMsg, InputGroup, SelectGroup, M, Modal } from '../_common';
import currencies from '../_constants/currencies';

export default class PaymentAgentWithdrawForm extends React.Component {
    static propTypes = {
        selectedPaymentAgent: PropTypes.string,
        paymentAgentOptions: PropTypes.array.isRequired,
        currency: PropTypes.oneOf(currencies).isRequired,
        actions: PropTypes.object,
        withdrawAmount: PropTypes.number,
        withdrawFailed: PropTypes.bool,
        withdrawError: PropTypes.string,
        withdrawClicked: PropTypes.bool,
        confirmClicked: PropTypes.bool,
        dryRunFailed: PropTypes.bool,
        dryRunError: PropTypes.string,
        inDryRun: PropTypes.bool,
        inWithdraw: PropTypes.bool,
    };

    onAmountChange(event) {
        this.props.actions.updatePaymentAgentField('withdrawAmount', event.target.value);
    }

    selectPaymentAgent(event) {
        this.props.actions.updatePaymentAgentField('selectedPaymentAgent', event.target.value);
    }

    tryWithdraw() {
        const { currency, selectedPaymentAgent, withdrawAmount } = this.props;
        this.props.actions.updatePaymentAgentField('withdrawClicked', true);
        this.props.actions.withdrawToPaymentAgentDryRun(selectedPaymentAgent, currency, withdrawAmount);
    }

    render() {
        const {
            actions,
            paymentAgentOptions,
            currency,
            selectedPaymentAgent,
            withdrawFailed,
            withdrawError,
            dryRunFailed,
            dryRunError,
            inDryRun,
            inWithdraw,
            withdrawAmount,
            withdrawClicked,
            confirmClicked,
            } = this.props;

        const selectedPaymentAgentName = selectedPaymentAgent ?
            paymentAgentOptions.filter(pa => pa.value === selectedPaymentAgent)[0].text :
            paymentAgentOptions[0].text;
        return (
            <div>
                <Modal
                    shown={!inDryRun && withdrawClicked}
                    children={
                        dryRunFailed ?
                        <div>
                            <h3>Withdrawal Failed</h3>
                            <p>{dryRunError}</p>
                        </div> :
                        <div>
                            <h3>Confirmation</h3>
                            <p>{`Are you sure you want to withdraw ${currency} ${withdrawAmount} to ${selectedPaymentAgentName} ?`}</p>
                            <button>Confirm</button>
                        </div>
                    }
                    onClose={() => actions.updatePaymentAgentField('withdrawClicked', false)}/>
                <Modal
                    shown={!inWithdraw && confirmClicked}
                    onClose={() => actions.updatePaymentAgentField('confirmClicked', false)}
                    children={
                        withdrawFailed ?
                        <div>
                            <h3>Withdrawal Failed</h3>
                            <p>{withdrawError}</p>
                        </div> :
                        <div>
                            <h3>Congratulations</h3>
                            <p>Your withdrawal is success</p>
                        </div>
                    } />
                <SelectGroup
                    label="Payment agent"
                    options={paymentAgentOptions}
                    placeholder="Choose a payment agent"
                    value={selectedPaymentAgent}
                    onChange={::this.selectPaymentAgent} />
                <ErrorMsg
                    shown={!selectedPaymentAgent}
                    text="Please select a payment agent to withdraw" />
                <InputGroup
                    label={`Withdraw (${currency})`}
                    placeholder="Amount"
                    type="number"
                    min={0}
                    max={5000} />
                <ErrorMsg
                    shown={false}
                    text="" />
                <button onClick={::this.tryWithdraw}>
                    <M m="Withdraw"/>
                </button>
            </div>
        );
    }
}
