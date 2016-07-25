import React, { PureComponent } from 'react';
import Button from 'binary-components/lib/Button';
import InputGroup from 'binary-components/lib/InputGroup';
import isValidPassword from 'binary-utils/lib/isValidPassword';
import ErrorMsg from 'binary-components/lib/ErrorMsg';
import P from 'binary-components/lib/P';
import * as LiveData from '../_data/LiveData';

export default class SettingsChangePassword extends PureComponent {

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

    onEntryChange = e =>
        this.setState({ [e.target.id]: e.target.value });

    changePassword = () => {
        this.setState({
            validatedOnce: true,
            errorMessage: '',
            successMessage: '',
            passwordNotValid: false,
            passwordsDontMatch: false,
        });
        const { currentPassword, newPassword, confirmPassword } = this.state;
        if (isValidPassword(newPassword, confirmPassword)) {
            this.sendRequest(currentPassword, newPassword);
        } else {
            this.setState({ passwordsDontMatch: true });
        }
    }

    async sendRequest(currentPassword, newPassword) {
        try {
            const response = await LiveData.api.changePassword(currentPassword, newPassword);
            if ('error' in response) {
               this.setState({ passwordNotValid: true });
            } else {
                this.setState({ successMessage: 'Password changed successfully.' });
            }
        } catch (e) {
            this.setState({ errorMessage: e.message });
        }
    }

    render() {
        const { validatedOnce, passwordNotValid, passwordsDontMatch, successMessage, errorMessage } = this.state;

        return (
            <div className="settings-change-password">
                <InputGroup
                    id="currentPassword"
                    placeholder="Current Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                <InputGroup
                    id="newPassword"
                    placeholder="New Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                {validatedOnce && passwordNotValid &&
                    <ErrorMsg text="Password should have lower and uppercase letters and 6 characters or more" />}
                <InputGroup
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                {validatedOnce && passwordsDontMatch &&
                    <ErrorMsg text="Passwords do not match" />}
                <Button
                    text="Change Password"
                    onClick={this.changePassword}
                />
                {validatedOnce && errorMessage &&
                    <ErrorMsg text={errorMessage} />}
                {validatedOnce && successMessage &&
                    <P className="successMessage" text="Password changed successfully." />}
            </div>
        );
    }
}
