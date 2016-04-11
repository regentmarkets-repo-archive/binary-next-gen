import React, { Component } from 'react';
import { Link } from 'react-router';
import M from '../_common/M';
import Button from '../_common/Button';
import Countries from '../_common/Countries';
import ErrorMsg from '../_common/ErrorMsg';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';
import config from '../config';

export default class AccountInfoForm extends Component {
    static propTypes = {
        email: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired,
        confirmPassword: React.PropTypes.string.isRequired,
        residence: React.PropTypes.string.isRequired,
        verificationCode: React.PropTypes.string.isRequired,
        validatedOnce: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.object.isRequired,
    };

    emailValid() {
        const { email } = this.props;
        return /\S+@\S+\.\S+/.test(email);
    }

    passwordValid() {
        const { password } = this.props;
        const expr = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,25}/;
        return expr.test(password);
    }

    confirmationValid() {
        const { password, confirmPassword } = this.props;
        return password === confirmPassword;
    }

    performCreateAccount() {
        const { email, password, verificationCode, residence } = this.props;
        this.props.actions.createAccountStart({
            email,
            client_password: password,
            residence,
            verification_code: verificationCode,
            affiliate_token: config.affiliateToken,
        });
    }

    async continue() {
        const { actions, email } = this.props;

        actions.createAccountFieldUpdate('validatedOnce', true);
        actions.createAccountFieldUpdate('progress', true);
        if (this.emailValid() && this.passwordValid() && this.confirmationValid()) {
            try {
                await LiveData.api.verifyEmail(email, 'account_opening');
                actions.createAccountFieldUpdate('step', 1);
                actions.createAccountFieldUpdate('progress', false);
            } catch (err) {
                actions.createAccountFieldUpdate('error', err);
            }
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
        const { residence, validatedOnce } = this.props;
        const countryNotSelected = !residence;
        const emailNotValid = !this.emailValid();
        const passwordNotValid = !this.passwordValid();
        const passwordsDontMatch = !this.confirmationValid();

        return (
            <div className="startup-content">
                <form className="mobile-form" onSubmit={e => e.preventDefault()}>
                    <InputGroup
                        type="email"
                        placeholder="Email"
                        onChange={::this.emailChange}
                    />
                    <ErrorMsg
                        shown={validatedOnce && emailNotValid}
                        text="Please enter a valid email"
                    />
                    <fieldset>
                        <Countries onChange={::this.residenceChange} />
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
                        text="Password should have lower and uppercase letters with numbers between 6-25 characters."
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
                    <Button text="Continue" onClick={::this.continue} />
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
