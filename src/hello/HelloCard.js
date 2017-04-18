import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { M, LogoSpinner } from 'binary-components';
import { signIn } from '../_data/Auth';
import LanguagePicker from '../web/LanguagePicker';

export default class HelloCard extends PureComponent {
    render() {
        return (
            <div className="startup-content">
                <div className="full-logo">
                    <LogoSpinner />
                    <img
                        className="logo-text"
                        src="img/binary-type-logo.svg"
                        alt="Logo"
                    />
                </div>
                <LanguagePicker />
                <Link
                    to="/signup"
                    className="create-account-button btn-secondary"
                >
                    <M m="Create Account" />
                </Link>
                <M className="have-account" m="Already have an account?" />
                <Link
                    to="/"
                    className="signin-button btn-primary"
                    onClick={signIn}
                >
                    <M m="Sign In" />
                </Link>
            </div>
        );
    }
}
