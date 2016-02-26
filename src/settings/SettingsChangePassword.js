import React from 'react';
import { showInfo, showError } from '../_utils/MessagingUtils';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';
import * as Validation from '../_utils/ValidationUtils';

export default class SettingsChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };
    }

    async sendRequest(req) {
        try {
            await LiveData.api.changePassword(req);
            showInfo('Password changed successfully.');
        } catch (e) {
            showError(e.message);
        }
    }

    onClick() {
        const { currentPassword, newPassword, confirmPassword } = this.state;
        if (Validation.isValidPassword(newPassword, confirmPassword)) {
            this.sendRequest({
                old_password: currentPassword,
                new_password: newPassword,
            });
        } else {
            null;   // Handle the error messages here console.log('The passwords do not match or lessthan 7');
        }
    }

    render() {
        const { currpassword, newpassword, verpassword } = this.state;
        return (
            <div className="mobile-form">
                <InputGroup
                    id="currpassword"
                    label="Current password"
                    type="password"
                    value={currpassword}
                    onChange={e => this.setState({ currpassword: e.target.value })}
                />
                <InputGroup
                    id="newpassword"
                    label="New password"
                    type="password"
                    value={newpassword}
                    onChange={e => this.setState({ newpassword: e.target.value })}
                />
                <div className="hint">Minimum 6 characters with at least 1 number</div>
                <InputGroup
                    id="verpassword"
                    label="Verify new password"
                    type="password"
                    value={verpassword}
                    onChange={e => this.setState({ verpassword: e.target.value })}
                />
                <button onClick={::this.onClick}>
                    <M m="Change Password" />
                </button>
            </div>
        );
    }
}
