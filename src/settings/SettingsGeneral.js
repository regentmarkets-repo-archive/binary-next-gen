import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import Button from '../_common/Button';
import LanguagePicker from '../_common/LanguagePicker';
import * as LiveData from '../_data/LiveData';
import VirtualTopUpConfirmation from './VirtualTopUpConfirmation';
import Modal from '../containers/Modal';

export default class SettingsGeneral extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
		boot: PropTypes.object.isRequired,
		balance: PropTypes.string.isRequired,
        settings: PropTypes.object,
	};

	onThemeChange(e) {
		this.props.actions.updateBoot('theme', e.target.value);
	}

	async topupClick() {
        const { actions } = this.props;
        try {
            const response = await LiveData.api.topUpVirtualAccount();
            actions.updateSettingFields({ topup_virtual: { topup_virtual: response.topup_virtual } });
        } catch (e) {
            actions.updateSettingFields({ topup_virtual: { error: e.message } });
		}
	}

	render() {
		const { theme } = this.props.boot;
		const { balance, actions } = this.props;
        const topupVirtual = this.props.settings.topup_virtual;

		return (
			<div>
				<label htmlFor="language-picker"><M m="Language" /></label>
				<LanguagePicker id="language-picker" />
				<label htmlFor="theme-picker"><M m="Color Theme" /></label>
				<select onChange={::this.onThemeChange} value={theme} id="theme-picker">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>

				<Modal
					shown={topupVirtual}
					onClose={() => actions.updateSettingFields({ topup_virtual: null }, false)}
				>
					<VirtualTopUpConfirmation
						response={topupVirtual || {}}
						onClose={() => actions.updateSettingFields({ topup_virtual: null }, false)}
					/>
                </Modal>
                {balance < 1000 &&
                    <Button
						text="Deposit USD 10,000 virtual money to your account"
						className="buy-btn"
						onClick={::this.topupClick}
                    />
                }
			</div>
		);
	}
}
