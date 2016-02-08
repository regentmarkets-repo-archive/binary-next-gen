import React, { PropTypes } from 'react';
import { ErrorMsg, InputGroup, SelectGroup, M, Modal } from '../_common';
import currencies from '../_constants/currencies';

export default class WithdrawForm extends React.Component {
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
        inProgress: PropTypes.bool,
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

    confirmWithdraw() {
        const { currency, selectedPaymentAgent, withdrawAmount } = this.props;
        this.props.actions.updatePaymentAgentField('withdrawClicked', false);
        this.props.actions.updatePaymentAgentField('confirmClicked', true);
        this.props.actions.withdrawToPaymentAgent(selectedPaymentAgent, currency, withdrawAmount);
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
            inProgress,
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
                    shown={!inProgress && withdrawClicked}
                    children={
                        dryRunFailed ?
                        <div>
                            <h3><M m="Withdrawal Failed" /></h3>
                            <p>{dryRunError}</p>
                        </div> :
                        <div>
                            <h3><M m="Confirmation" /></h3>
                            <p>
                                <M m="Are you sure you want to withdraw" />
                                <span> {currency} {withdrawAmount} to {selectedPaymentAgentName}?></span>
                            </p>
                            <button onClick={::this.confirmWithdraw}>
                                <M m="Confirm" />
                            </button>
                        </div>
                    }
                    onClose={() => actions.updatePaymentAgentField('withdrawClicked', false)}
                />
                <Modal
                    shown={!inProgress && confirmClicked}
                    onClose={() => actions.updatePaymentAgentField('confirmClicked', false)}
                    children={
                        withdrawFailed ?
                        <div>
                            <h3><M m="Withdrawal Failed" /></h3>
                            <p>{withdrawError}</p>
                        </div> :
                        <div>
                            <h3><M m="Congratulations" /></h3>
                            <p><M m="Your withdrawal is success" /></p>
                        </div>
                    }
                />
                <SelectGroup
                    label="Payment agent"
                    options={paymentAgentOptions}
                    placeholder="Choose a payment agent"
                    value={selectedPaymentAgent}
                    onChange={::this.selectPaymentAgent}
                />
                <InputGroup
                    label={`Withdraw (${currency})`}
                    placeholder="Amount"
                    type="number"
                    min={0}
                    max={5000}
                />
                <ErrorMsg
                    shown={false}
                    text=""
                />
                <button onClick={::this.tryWithdraw}>
                    <M m="Withdraw"/>
                </button>
            </div>
        );
    }
}
