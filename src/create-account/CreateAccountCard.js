import React, { Component, PropTypes } from 'react';
import P from 'binary-components/lib/P';
import Button from 'binary-components/lib/Button';
import Countries from 'binary-components/lib/Countries';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import InputGroup from 'binary-components/lib/InputGroup';
import LogoSpinner from 'binary-components/lib/LogoSpinner';
import { api } from '../_data/LiveData';
import config from '../config';

export default class CrateAccountCard extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: false,
            error: '',
            verificationCode: '',
            password: '',
            confirmPassword: '',
            residence: '',
        };
    }

    onVerificationCodeChange = e =>
        this.setState({ verificationCode: e.target.value });

    onPasswordChange = e =>
        this.setState({ password: e.target.value });

    onConfirmPasswordChange = e =>
        this.setState({ confirmPassword: e.target.value });

    onResidenceChange = e =>
        this.setState({ residence: e.target.value });

    onFormSubmit = e => {
        e.preventDefault();
        this.setState({
            validatedOnce: true,
        });
        if (this.allValid) {
            this.performCreateAccount();
        }
    }

    performCreateAccount = async () => {
        const { password, verificationCode, residence } = this.state;

        try {
            this.setState({
                progress: true,
                serverError: false,
            });
            const response = await api.createVirtualAccount({
                // email,
                verification_code: verificationCode,
                client_password: password,
                residence,
                affiliate_token: config.affiliateToken,
            });
            localStorage.setItem('account', JSON.stringify({ token: response.new_account_virtual.oauth_token }));

            // use react router because we want hash history in mobile
            this.context.router.push('/');
            window.location.reload();
        } catch (error) {
            this.setState({ serverError: error.message });
        } finally {
            this.setState({
                progress: false,
            });
        }
    }

    render() {
        const { verificationCode, password, confirmPassword, residence, validatedOnce, progress, serverError } = this.state;
        const residenceIsValid = !!residence;
        const verificationCodeIsValid = verificationCode.length >= 15;
        const passwordIsValid = password.length >= 6;
        const passwordsMatch = password === confirmPassword;
        this.allValid = residenceIsValid && verificationCodeIsValid && passwordIsValid && passwordsMatch;

        return (
            <div className="startup-content">
                <LogoSpinner spinning={progress} />
                <img className="logo-text" src="img/binary-type-logo.svg" alt="Logo" />
                <P className="notice-msg" text="Thank you for signing up! Check your email to get the verification token." />
                {serverError &&
                    <ErrorMsg text={serverError} />
                }
                <form onSubmit={this.onFormSubmit}>
                    <InputGroup
                        type="text"
                        placeholder="Verification Code"
                        onChange={this.onVerificationCodeChange}
                    />
                    {validatedOnce && !verificationCodeIsValid &&
                        <ErrorMsg text="Enter a valid verification code" />
                    }
                    <fieldset>
                        <Countries onChange={this.onResidenceChange} />
                    </fieldset>
                    {validatedOnce && !residenceIsValid &&
                        <ErrorMsg text="Choose your country" />
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
                    <Button disabled={progress || validatedOnce && !this.allValid} text="Continue" />
                </form>
            </div>
        );
    }
}
