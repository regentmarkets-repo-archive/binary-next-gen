import React, { PropTypes, PureComponent } from 'react';
import M from 'binary-components/lib/M';
import Button from 'binary-components/lib/Button';
import { actions } from '../_store';
import * as LiveData from '../_data/LiveData';
import VirtualTopUpConfirmation from './VirtualTopUpConfirmation';
import Modal from '../containers/Modal';

export default class SettingsGeneral extends PureComponent {

	static propTypes = {
		loginid: PropTypes.string.isRequired,
		boot: PropTypes.object.isRequired,
		balance: PropTypes.string.isRequired,
        settings: PropTypes.object,
	};

	onThemeChange = e =>
		actions.updateBoot('theme', e.target.value);

	async onTopup() {
        try {
            const response = await LiveData.api.topUpVirtualAccount();
            actions.updateSettingFields({ topup_virtual: { topup_virtual: response.topup_virtual } });
        } catch (e) {
            actions.updateSettingFields({ topup_virtual: { error: e.message } });
		}
	}

	hideTopup = () =>
		actions.updateSettingFields({ topup_virtual: null }, false);

	render() {
		const { theme } = this.props.boot;
		const { balance } = this.props;
        const topupVirtual = this.props.settings.topup_virtual;

		return (
			<div className="settings-general">
				<label htmlFor="theme-picker"><M m="Color Theme" /></label>
				<select onChange={this.onThemeChange} value={theme} id="theme-picker" className="theme-picker">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>

				<Modal
					shown={topupVirtual}
					onClose={this.hideTopup}
				>
					<VirtualTopUpConfirmation
						response={topupVirtual || {}}
						onClose={this.hideTopup}
					/>
                </Modal>
                {balance < 1000 &&
                    <Button
						text="Deposit USD 10,000 virtual money to your account"
						className="buy-btn"
						onClick={this.onTopup}
                    />
                }
			</div>
		);
	}
}
