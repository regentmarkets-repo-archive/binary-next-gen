import React, { PropTypes } from 'react';
import M from '../_common/M';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';
import * as Validation from '../_utils/ValidationUtils';

export default class SettingsChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currpassword: '',
            newpassword: '',
            verpassword: '',
        };
    }

    async sendRequest(req) {
        try {
            await LiveData.api.changePassword(req);
            alert('Password changed successfully.');
        } catch (e) {
            alert(e.message);
        }
    }

    Click() {

        const { currpassword, newpassword, verpassword } = this.state;
        if (!!(Validation.isValidPassword(newpassword, verpassword))) {
            this.sendRequest({
                old_password: currpassword,
                new_password: newpassword,
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

                <button onClick={::this.Click}>
                    <M m="Change Password"/>
                </button>

            </div>
        );
    }
}
