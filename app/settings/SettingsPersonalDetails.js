import React from 'react';

export default class SettingsPersonalDetails extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {

		return (
			<div>
				<legend>details</legend>
				<label>Name</label>
				<input readOnly="true" value="sdfsdf sdfsdf (Mr)" />
				<label>Date of birth</label>
				<input readOnly="true" value="1918-03-01" />
				<label>Country of Residence</label>
				<input readOnly="true" value="Indonesia" />
				<label>Email</label>
				<input readOnly="true" value="bobtester@mailinator.com" />

				<legend>Address</legend>
				<label htmlFor="Address1">First line of home address</label>
				<input id="Address1" type="text" defaultValue="sdfsadf" />
				<label htmlFor="Address2">Second line of home address</label>
				<input className="text" id="Address2" defaultValue="asdfasdf" />
				<label htmlFor="AddressTown">Town/City</label>
				<input id="AddressTown" type="text" defaultValue="sdfasdf" />
				<label htmlFor="AddressState">State/Province</label>
				<select id="AddressState" name="AddressState">
					<option value="">Please select</option><option value="AC">Aceh</option><option value="BA">Bali</option><option value="BB">Bangka Belitung</option><option value="BT">Banten</option><option value="BE">Bengkulu</option><option value="GO">Gorontalo</option><option value="JK">Jakarta Raya</option><option value="JA">Jambi</option><option value="JB">Jawa Barat</option><option value="JT">Jawa Tengah</option><option value="JI">Jawa Timur</option><option value="KB">Kalimantan Barat</option><option value="KS">Kalimantan Selatan</option><option value="KT">Kalimantan Tengah</option><option value="KI">Kalimantan Timur</option><option value="KR">Kepulauan Riau</option><option value="LA">Lampung</option><option value="MA">Maluku</option><option value="MU">Maluku Utara</option><option value="NB">Nusa Tenggara Barat</option><option value="NT">Nusa Tenggara Timur</option><option value="PA">Papua</option><option value="PB">Papua Barat</option><option value="RI">Riau</option><option value="SG">Sulawesi Barat</option><option value="SN">Sulawesi Selatan</option><option value="ST">Sulawesi Tengah</option><option value="SG">Sulawesi Tenggara</option><option value="SA">Sulawesi Utara</option><option value="SB">Sumatera Barat</option><option value="SS">Sumatera Selatan</option><option value="SU">Sumatera Utara</option><option value="YO">Yogyakarta</option>
				</select>
				<label htmlFor="AddressPostcode">Postal Code / ZIP</label>
				<input id="AddressPostcode" type="text" defaultValue="23423423" />
				<label htmlFor="Tel">Telephone</label>
				<input id="Tel" type="text" defaultValue="+6223423423423" />

				<button>Update</button>
			</div>
		);
	}
}
