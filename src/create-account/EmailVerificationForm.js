import React from 'react';
import { InputGroup, M, ErrorMsg } from '../_common';
import * as LiveData from '../_data/LiveData';

export default class EmailVerificationForm extends React.Component {
    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        createAccount: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired,
    };

    onVerificationCodeEntered(event) {
        const { actions } = this.props;
        actions.createAccountFieldUpdate('verificationCode', event.target.value);
        actions.createAccountFieldUpdate('error', null);
    }

    onVerify() {
        const { createAccount, actions } = this.props;
        actions.createAccountFieldUpdate('progress', true);
        LiveData.api.createVirtualAccount({
            email: createAccount.get('email'),
            client_password: createAccount.get('password'),
            residence: createAccount.get('residence'),
            verification_code: createAccount.get('verificationCode'),
        })
            .then(
                () => history.push('/signin'),
                err => actions.createAccountFailed(err)
            ).then(() => actions.createAccountFieldUpdate('progress', false));
    }

    render() {
        const { error } = this.props.createAccount.toJS();
        return (
            <div>
                <h3>
                    <M m="Please enter your email verification code" />
                </h3>
                <InputGroup
                    type="text"
                    placeholder="Verification Code"
                />
                <ErrorMsg
                    shown={!!error}
                    text={(error && error.message) || '-'}
                />
                <button onClick={::this.onVerify}><M m="Verify" /></button>
            </div>
        );
    }
}
