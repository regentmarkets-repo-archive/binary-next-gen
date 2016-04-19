import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import SelectGroup from '../_common/SelectGroup';
import Modal from '../containers/Modal';
import currencies from '../_constants/currencies';
import * as LiveData from '../_data/LiveData';

export default class WithdrawForm extends Component {
    static propTypes = {
        paymentAgent: PropTypes.object.isRequired,
        currency: PropTypes.oneOf(currencies).isRequired,
        actions: PropTypes.object,
        email: PropTypes.string,
    };
    async componentDidMount() {
        const { email } = this.props;
        await LiveData.api.sendVerificationEmail(email);
    }
    onAmountChange(event) {
        const { actions } = this.props;
        actions.updatePaymentAgentField('withdrawAmount', event.target.value);
    }

    selectPaymentAgent(event) {
        const { actions } = this.props;
        actions.updatePaymentAgentField('selectedPaymentAgent', event.target.value);
    }

    onVerificationCodeChange(event) {
        const { actions } = this.props;
        actions.updatePaymentAgentField('verificationCode', event.target.value);
    }

    tryWithdraw() {
        const { currency, paymentAgent, actions } = this.props;
        const { selectedPaymentAgent, withdrawAmount, verificationCode } = paymentAgent;
        actions.updatePaymentAgentField('withdrawClicked', true);
        actions.withdrawToPaymentAgentDryRun(selectedPaymentAgent, currency, withdrawAmount, verificationCode);
    }

    confirmWithdraw() {
        const { currency, actions, paymentAgent } = this.props;
        const { selectedPaymentAgent, withdrawAmount, verificationCode } = paymentAgent;
        actions.updatePaymentAgentField('withdrawClicked', false);
        actions.updatePaymentAgentField('confirmClicked', true);
        actions.withdrawToPaymentAgent(selectedPaymentAgent, currency, withdrawAmount, verificationCode);
    }

    render() {
        const {
            actions,
            currency,
            paymentAgent,
        } = this.props;
        const {
            paymentAgents,
            withdrawError,
            dryRunError,
            inProgress,
            dryRunFailed,
            withdrawFailed,
            selectedPaymentAgent,
            withdrawClicked,
            withdrawAmount,
            confirmClicked,
         } = paymentAgent;
        const paymentAgentOptions = paymentAgents.map(pa => ({ value: pa.paymentagent_loginid, text: pa.name }));
        const selectedPaymentAgentName = selectedPaymentAgent ?
            paymentAgentOptions.filter(pa => pa.value === selectedPaymentAgent)[0].text :
            paymentAgentOptions[0].text;
        return (
            <div className="startup-content">
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
                                <span> {currency} {withdrawAmount} to {selectedPaymentAgentName}? </span>
                            </p>
                            <Button text="Confirm" onClick={::this.confirmWithdraw} />
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
                    onChange={::this.onAmountChange}
                />
                <InputGroup
                    label="Verification Code(check your email)"
                    placeholder="Verification Code"
                    type="text"
                    onChange={::this.onVerificationCodeChange}
                />
                <ErrorMsg
                    shown={false}
                    text=""
                />
                <Button text="Withdraw" onClick={::this.tryWithdraw} />
            </div>
        );
    }
}
