import React from 'react';
import { Link } from 'react-router';
import { Countries, ErrorMsg, InputGroup, LogoSpinner, M } from '../_common';
import * as LiveData from '../_data/LiveData';
import config from 'json!../config.json';

export default class CreateAccountCard extends React.Component {
    static propTypes = {
        createAccount: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired,
    };

    emailValid() {
        const { email } = this.props.createAccount.toJS();

        return /\S+@\S+\.\S+/.test(email);
    }

    passwordValid() {
        const { password } = this.props.createAccount.toJS();
        return /^[\s.A-Za-z0-9@_:+-\/=]{5,25}$/.test(password);
    }

    confirmationValid() {
        const { password, confirmPassword } = this.props.createAccount.toJS();
        return password === confirmPassword;
    }

    performCreateAccount() {
        const { email, password, verificationCode, residence } = this.props.createAccount.toJS();
        this.props.actions.createAccountStart({
            email,
            client_password: password,
            residence,
            verification_code: verificationCode,
            affiliate_token: config.affiliateToken,
        });
    }

    proceed() {
        const { actions } = this.props;
        actions.createAccountFieldUpdate('validatedOnce', true);
        actions.createAccountFieldUpdate('progress', true);
        if (this.emailValid() && this.passwordValid() && this.confirmationValid()) {
            const { email } = this.props.createAccount.toJS();
            LiveData.api.verifyEmail(email).then(() => {
                actions.createAccountFieldUpdate('step', 1);
                actions.createAccountFieldUpdate('progress', false);
            });
        }
    }

    emailChange(event) {
        this.props.actions.createAccountFieldUpdate('email', event.target.value);
    }

    residenceChange(event) {
        this.props.actions.createAccountFieldUpdate('residence', event.target.value);
    }

    confirmPasswordChange(event) {
        this.props.actions.createAccountFieldUpdate('confirmPassword', event.target.value);
    }

    passwordChange(event) {
        this.props.actions.createAccountFieldUpdate('password', event.target.value);
    }

    render() {
        const { residence, validatedOnce, progress } = this.props.createAccount.toJS();
        const countryNotSelected = !residence;
        const emailNotValid = !this.emailValid();
        const passwordNotValid = !this.passwordValid();
        const passwordsDontMatch = !this.confirmationValid();

        return (
            <div className="startup-content">
                <p className="media">
                    <LogoSpinner spinning={progress}/>
                    <img className="logo-text" src="img/binary-type-logo.svg" />
                </p>
                <form className="mobile-form" onSubmit={e => e.preventDefault()}>
                    <InputGroup
                        type="email"
                        placeholder="Email"
                        onChange={::this.emailChange}
                    />
                    <ErrorMsg
                        shown={validatedOnce && emailNotValid}
                        text="You need to enter an email"
                    />
                    <fieldset>
                        <Countries onChange={::this.residenceChange}/>
                    </fieldset>
                    <ErrorMsg
                        shown={validatedOnce && countryNotSelected}
                        text="Please select a country"
                    />
                    <InputGroup
                        type="password"
                        placeholder="Password"
                        onChange={::this.passwordChange}
                    />
                    <ErrorMsg
                        shown={validatedOnce && passwordNotValid}
                        text="Password not valid"
                    />
                    <InputGroup
                        type="password"
                        placeholder="Confirm Password"
                        onChange={::this.confirmPasswordChange}
                    />
                    <ErrorMsg
                        shown={validatedOnce && passwordsDontMatch}
                        text="Passwords do not match"
                    />
                    <button onClick={::this.proceed}>
                        <M m="Proceed" />
                    </button>
                </form>
                <fieldset>
                    <Link to="/signin" className="btn-secondary">
                        <M m="Sign in" />
                    </Link>
                </fieldset>
            </div>
        );
    }
}
