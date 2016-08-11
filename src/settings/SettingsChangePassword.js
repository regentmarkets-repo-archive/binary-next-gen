import React, { PureComponent } from 'react';
import { Button, Legend, InputGroup, ServerError } from 'binary-components';
import { isValidPassword } from 'binary-utils';
import * as LiveData from '../_data/LiveData';

export default class SettingsChangePassword extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            progress: false,
            validatedOnce: false,
            serverError: false,
        };
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

    async performChangePassword(currentPassword, newPassword) {
        try {
            await LiveData.api.changePassword(currentPassword, newPassword);
            this.setState({ success: true });
        } catch (e) {
            this.setState({ serverError: e.error.error.message });
        }
    }

    render() {
        const { validatedOnce, serverError, currentPassword, newPassword, confirmPassword } = this.state;
        const currentPasswordIsValid = isValidPassword(currentPassword);
        const newPasswordIsValid = isValidPassword(newPassword);
        const passwordsMatch = newPassword === confirmPassword;
        this.allValid = currentPasswordIsValid && newPasswordIsValid && passwordsMatch;

        return (
            <form className="settings-change-password" onSubmit={this.onFormSubmit}>
                <Legend text="Change Password" />
                {/* <Notice text={'successfully updated'} /> */}
                {serverError &&
                    <ServerError text={serverError} />
                }
                {/* {validatedOnce && successMessage &&
                    <Notice text="Password changed successfully." />
                }*/}
                <InputGroup
                    id="currentPassword"
                    placeholder="Current Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !currentPasswordIsValid &&
                    <Error text="Password should have lower and uppercase letters and 6 characters or more" />
                }
                <InputGroup
                    id="newPassword"
                    placeholder="New Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !newPasswordIsValid &&
                    <Error text="Password should have lower and uppercase letters and 6 characters or more" />
                }
                <InputGroup
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                    type="password"
                    onChange={this.onEntryChange}
                />
                {validatedOnce && !passwordsMatch &&
                    <Error text="Passwords do not match" />
                }
                <Button
                    text="Change Password"
                    onClick={this.changePassword}
                />
            </form>
        );
    }
}
