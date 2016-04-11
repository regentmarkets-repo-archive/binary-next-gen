import React, { Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class EmailVerificationForm extends Component {

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        error: React.PropTypes.object,
        email: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
        residence: React.PropTypes.string.isRequired,
        verificationCode: React.PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    async onVerificationCodeEntered(event) {
        const { actions } = this.props;
        try {
            await actions.createAccountFieldUpdate('verificationCode', event.target.value);
            await actions.createAccountFieldUpdate('error', null);
        } catch (err) {
            actions.createAccountFieldUpdate('error', err);
        }
    }

    async onVerify() {
        const { actions, password, residence, verificationCode } = this.props;
        const { router } = this.context;

        actions.createAccountFieldUpdate('progress', true);
        try {
            await LiveData.api.createVirtualAccount({
                client_password: password,
                residence,
                verification_code: verificationCode,
            });
            router.push('/signin');
        } catch (err) {
            actions.createAccountFailed(err);
        } finally {
            actions.createAccountFieldUpdate('progress', false);
        }
    }

    async goBack() {
        const { actions } = this.props;
        await actions.createAccountFieldUpdate('error', null);
        actions.createAccountFieldUpdate('step', 0);
    }

    render() {
        const { error } = this.props;
        return (
            <div>
                <h3>
                    <M m="Please enter your email verification code" />
                </h3>
                <InputGroup
                    type="text"
                    placeholder="Verification Code"
                    onChange={::this.onVerificationCodeEntered}
                />
                <ErrorMsg
                    shown={!!error}
                    text={(error && error.message) || '-'}
                />
                <Button text="Go back" onClick={::this.goBack} className="btn-secondary" />
                &nbsp;
                <Button text="Verify" onClick={::this.onVerify} />
            </div>
        );
    }
}
