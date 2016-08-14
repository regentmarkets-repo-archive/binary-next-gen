import React, { PureComponent } from 'react';
import { Button, Legend, InputGroup, ServerError, Error } from 'binary-components';
import { isValidPassword } from 'binary-utils';
import UpdateNotice from '../containers/UpdateNotice';
import { api } from '../_data/LiveData';

const initialState = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    progress: false,
    validatedOnce: false,
    serverError: false,
};

export default class SettingsChangePassword extends PureComponent {

    constructor(props) {
        super(props);

        this.state = initialState;
    }

    onEntryChange = e =>
        this.setState({ [e.target.id]: e.target.value });

    onFormSubmit = e => {
        e.preventDefault();
        this.setState({
            validatedOnce: true,
        });
        if (this.allValid) {
            this.performChangePassword();
        }
    }

    async performChangePassword() {
        const { currentPassword, newPassword } = this.state;
        try {
            await api.changePassword(currentPassword, newPassword);
            this.setState({
                success: true,
                ...initialState,
            });
        } catch (e) {
            this.setState({ serverError: e.error.error.message });
        }
    }

    dostuff = () => {
        this.setState({ success: true });
    }

    render() {
        const { validatedOnce, serverError, success, currentPassword, newPassword, confirmPassword } = this.state;
        const currentPasswordIsValid = isValidPassword(currentPassword);
        const newPasswordIsValid = isValidPassword(newPassword);
        const passwordsMatch = newPassword === confirmPassword;
        this.allValid = currentPasswordIsValid && newPasswordIsValid && passwordsMatch;

        return (
            <form className="settings-change-password" onSubmit={this.onFormSubmit}>
                <UpdateNotice text="Password changed successfully." show={success} />
                <Legend text="Change Password" />
                {serverError && <ServerError text={serverError} />}
                <InputGroup
                    id="currentPassword"
                    placeholder="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !currentPasswordIsValid &&
                    <Error text="Password should have lower and uppercase letters and 6 characters or more" />
                }
                <InputGroup
                    id="newPassword"
                    placeholder="New Password"
                    type="password"
                    value={newPassword}
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !newPasswordIsValid &&
                    <Error text="Password should have lower and uppercase letters and 6 characters or more" />
                }
                <InputGroup
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !passwordsMatch &&
                    <Error text="Passwords do not match" />
                }
                <Button text="Change Password" />
            </form>
        );
    }
}
