import React from 'react';
import Button from '../_common/Button';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';
import isValidPassword from 'binary-utils/lib/isValidPassword';
import ErrorMsg from '../_common/ErrorMsg';
import M from '../_common/M';

export default class SettingsChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            validatedOnce: false,
            passwordsDontMatch: false,
            passwordNotValid: false,
            successMessage: '',
            errorMessage: '',
        };
    }

    async sendRequest(req) {
        try {
            const response = await LiveData.api.changePassword(req);
            if ('error' in response) {
               this.setState({ passwordNotValid: true });
            } else {
                this.setState({ successMessage: 'Password changed successfully.' });
            }
        } catch (e) {
            this.setState({ errorMessage: e.message });
        }
    }

    onClick() {
        this.setState({
            validatedOnce: true,
            errorMessage: '',
            successMessage: '',
            passwordNotValid: false,
            passwordsDontMatch: false,
        });
        const { currentPassword, newPassword, confirmPassword } = this.state;
        if (isValidPassword(newPassword, confirmPassword)) {
            this.sendRequest({
                old_password: currentPassword,
                new_password: newPassword,
            });
        } else {
            this.setState({ passwordsDontMatch: true });
        }
    }

    render() {
        const { validatedOnce, passwordNotValid, passwordsDontMatch, successMessage, errorMessage } = this.state;
        return (
            <div className="startup-content row-spacer">
                <div className="mobile-form" onSubmit={e => e.preventDefault()}>
                    <form className="mobile-form" onSubmit={e => e.preventDefault()}>
                        <InputGroup
                            placeholder="Current password"
                            type="password"
                            onChange={e => this.setState({ currentPassword: e.target.value })}
                        />
                        <InputGroup
                            placeholder="New password"
                            type="password"
                            onChange={e => this.setState({ newPassword: e.target.value })}
                        />
                        <ErrorMsg
                            shown={validatedOnce && passwordNotValid}
                            text="Password should have lower and uppercase letters with numbers, at least 6 characters."
                        />
                        <InputGroup
                            placeholder="Confirm new password"
                            type="password"
                            onChange={e => this.setState({ confirmPassword: e.target.value })}
                        />
                        <ErrorMsg
                            shown={validatedOnce && passwordsDontMatch}
                            text="Passwords do not match"
                        />
                        <Button
                            text="Change Password"
                            onClick={::this.onClick}
                        />
                        <div className="row-spacer">
                            <ErrorMsg
                                shown={validatedOnce && !!errorMessage}
                                text={errorMessage}
                            />
                            {validatedOnce && successMessage ?
                            <p className="successMessage">
                                    <M m={successMessage} />
                            </p> :
                            null
                            }
                        </div>
                    </form>
                </div>
             </div>
        );
    }
}
