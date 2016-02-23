import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import LanguagePicker from '../_common/LanguagePicker';
import * as LiveData from '../_data/LiveData';
import VirtualTopUpConfirmation from '../_common/VirtualTopUpConfirmation';
import Modal from '../containers/Modal';


export default class SettingsGeneral extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		loginid: PropTypes.string.isRequired,
		appConfig: PropTypes.object.isRequired,
		balance: PropTypes.string.isRequired,
        settings: PropTypes.object,
	};

	onThemeChange(e) {
		this.props.actions.updateAppConfig('theme', e.target.value);
	}
	topUpClick() {
        const { actions } = this.props;
		LiveData.api.topUpVirtualAccount().then(response => {
            actions.updateSettingFields({ topup_virtual: { topup_virtual: response.topup_virtual } });

		})
		.catch(err => {
            actions.updateSettingFields({ topup_virtual: { error: err.message } });
		});
	}

	render() {
		const { theme } = this.props.appConfig;
		const { balance, loginid, actions } = this.props;
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

                <Modal shown={ !!(topupVirtual) } onClose={() => actions.updateSettingFields({ topup_virtual: null }, false)}>
                    <VirtualTopUpConfirmation response = { topupVirtual } loginid={ loginid } />
                </Modal>
                {
                    (balance < 1000)
                        ?
                            <button className="buy-btn" onClick={::this.topUpClick}>
                                <M m="Deposit USD 10000 virtual money into your account "/>
                            </button>
                        :
                            null
                }
			</div>
		);
	}
}
