import React, { Component } from 'react';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';
import Countries from 'binary-components/lib/Countries';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import InputGroup from 'binary-components/lib/InputGroup';
import { actions } from '../_store';
import * as LiveData from '../_data/LiveData';
import config from '../config';

export default class CrateAccountCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verificationCode: '',
            password: '',
            confirmPassword: '',
            residence: '',
        };
    }

    onVerificationCodeChange = event =>
        this.setState({ verificationCode: event.target.value });

    onPasswordChange = event =>
        this.setState({ password: event.target.value });

    onConfirmPasswordChange = event =>
        this.setState({ confirmPassword: event.target.value });

    onResidenceChange = event =>
        this.setState({ residence: event.target.value });

    onCreateClick = () => {
        this.setState({
            validatedOnce: true,
        });
        if (this.allValid) {
            this.performCreateAccount();
        }
    }

    performCreateAccount() {
        const { email, password, verificationCode, residence } = this.state;
        actions.createAccountStart({
            email,
            verification_code: verificationCode,
            client_password: password,
            residence,
            affiliate_token: config.affiliateToken,
        });
    }

    verifyEmail = async () => {
        const { email } = this.state;

        try {
            this.setState({
                step: 1,
                progress: true,
                error: false,
            });
            await LiveData.api.verifyEmail(email, 'account_opening');
        } catch (error) {
            this.setState({ error });
        } finally {
            this.setState({
                progress: false,
            });
        }
    }

    render() {
        const { verificationCode, password, confirmPassword, residence, validatedOnce } = this.state;
        const residenceIsValid = !!residence;
        const verificationCodeIsValid = verificationCode.length >= 15;
        const passwordIsValid = password.length >= 6;
        const passwordsMatch = password === confirmPassword;
        this.allValid = residenceIsValid && verificationCodeIsValid && passwordIsValid && passwordsMatch;

        return (
            <div className="startup-content">
                <P className="notice-msg" text="Thank you for signing up! Please check your email to retrieve the verification token." />
                <InputGroup
                    type="text"
                    placeholder="Verification Token"
                    onChange={this.onVerificationCodeChange}
                />
                {validatedOnce && !verificationCodeIsValid &&
                    <ErrorMsg text="Please enter a valid verification code" />
                }
                <fieldset>
                    <Countries onChange={this.onResidenceChange} />
                </fieldset>
                {validatedOnce && !residenceIsValid &&
                    <ErrorMsg text="Please select a country" />
                }
                <InputGroup
                    type="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                />
                {validatedOnce && !passwordIsValid &&
                    <ErrorMsg text="Password should have lower and uppercase letters with numbers between 6-25 characters." />
                }
                <InputGroup
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.onConfirmPasswordChange}
                />
                {validatedOnce && !passwordsMatch &&
                    <ErrorMsg text="Passwords do not match" />
                }
                <Button disabled={validatedOnce && !this.allValid} text="Continue" onClick={this.onCreateClick} />
            </div>
        );
    }
}
