import React from 'react';
import InputGroup from '../_common/InputGroup';
import * as LiveData from '../_data/LiveData';

export default class SettingsAddress extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		settings: React.PropTypes.object.isRequired,
	};

	onAddressChange(event) {
		const key = event.target.id;
		const val = event.target.value;
		const obj = {};
		obj[key] = val;
		this.setState(obj);
	}

	tryUpdate() {
		const req = {
			set_settings: 1,
			address_line_1: this.state.address1,
			address_line_2: this.state.address2,
			address_city: this.state.city,
			address_state: this.state.AddressState,
			address_postcode: this.state.postcode,
			phone: this.state.tel,
		};
		LiveData.api.send(req).then(
			response => {
				if (response.set_settings === 1) {
					this.actions.serverDataAccountSettings(req);
				} else {
					// show user something wrong
					console.log(response);
				}
			},
			error => {
				console.log('error', error);
			}
		);
	}

	render() {
		const {settings} = this.props;

		return (
			<div>
				<legend>Address</legend>
				<InputGroup
					id="address1"
					type="text"
					label="First line of home address"
					value={settings.address_line_1}
					onChange={::this.onAddressChange}/>
				<InputGroup
					id="address2"
					type="text"
					label="Second line of home address"
					value={settings.address_line_2}
					onChange={::this.onAddressChange}/>
				<InputGroup
					id="city"
					type="text"
					label="Town/City"
					value={settings.address_city}
					onChange={::this.onAddressChange}/>

				<fieldset>
					<label htmlFor="AddressState">State/Province</label>
					<select id="AddressState" name="AddressState" onChange={::this.onAddressChange}>
						<option value="">Please select</option><option value="AC">Aceh</option><option value="BA">Bali</option><option value="BB">Bangka Belitung</option><option value="BT">Banten</option><option value="BE">Bengkulu</option><option value="GO">Gorontalo</option><option value="JK">Jakarta Raya</option><option value="JA">Jambi</option><option value="JB">Jawa Barat</option><option value="JT">Jawa Tengah</option><option value="JI">Jawa Timur</option><option value="KB">Kalimantan Barat</option><option value="KS">Kalimantan Selatan</option><option value="KT">Kalimantan Tengah</option><option value="KI">Kalimantan Timur</option><option value="KR">Kepulauan Riau</option><option value="LA">Lampung</option><option value="MA">Maluku</option><option value="MU">Maluku Utara</option><option value="NB">Nusa Tenggara Barat</option><option value="NT">Nusa Tenggara Timur</option><option value="PA">Papua</option><option value="PB">Papua Barat</option><option value="RI">Riau</option><option value="SG">Sulawesi Barat</option><option value="SN">Sulawesi Selatan</option><option value="ST">Sulawesi Tengah</option><option value="SG">Sulawesi Tenggara</option><option value="SA">Sulawesi Utara</option><option value="SB">Sumatera Barat</option><option value="SS">Sumatera Selatan</option><option value="SU">Sumatera Utara</option><option value="YO">Yogyakarta</option>
					</select>
				</fieldset>

				<InputGroup
					id="postcode"
					type="text"
					label="Postal Code / ZIP"
					value={settings.address_postcode}
					onChange={::this.onAddressChange}/>
				<InputGroup
					id="tel"
					type="tel"
					label="Telephone"
					value={settings.phone}
					onChange={::this.onAddressChange}/>

				<button onClick={::this.tryUpdate}>Update</button>
			</div>
		);
	}
}
