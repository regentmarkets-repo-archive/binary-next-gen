import React from 'react';
import InputGroup from '../common/InputGroup';

export default () => (
	<div>
		<legend>details</legend>

		<InputGroup id="name" label="Name" type="text" value="Boris Yankov (Mr)" readOnly={true} />
		<InputGroup id="dob" label="Date of birth" type="date" value="1981-12-12" readOnly={true} />
		<InputGroup id="residence" label="Country of Residence" type="text" value="Bulgaria" readOnly={true} />
		<InputGroup id="email" label="Email" type="email" value="bobtester@mailinator.com" readOnly={true} />

		<legend>Address</legend>

		<InputGroup id="address1" type="text" label="First line of home address" value="St. Petersen Str." />
		<InputGroup id="address2" type="text" label="Second line of home address" value="Wallnuts 12-44" />
		<InputGroup id="city" type="text" label="Town/City" value="sdfasdf" />

		<fieldset>
			<label htmlFor="AddressState">State/Province</label>
			<select id="AddressState" name="AddressState">
				<option value="">Please select</option><option value="AC">Aceh</option><option value="BA">Bali</option><option value="BB">Bangka Belitung</option><option value="BT">Banten</option><option value="BE">Bengkulu</option><option value="GO">Gorontalo</option><option value="JK">Jakarta Raya</option><option value="JA">Jambi</option><option value="JB">Jawa Barat</option><option value="JT">Jawa Tengah</option><option value="JI">Jawa Timur</option><option value="KB">Kalimantan Barat</option><option value="KS">Kalimantan Selatan</option><option value="KT">Kalimantan Tengah</option><option value="KI">Kalimantan Timur</option><option value="KR">Kepulauan Riau</option><option value="LA">Lampung</option><option value="MA">Maluku</option><option value="MU">Maluku Utara</option><option value="NB">Nusa Tenggara Barat</option><option value="NT">Nusa Tenggara Timur</option><option value="PA">Papua</option><option value="PB">Papua Barat</option><option value="RI">Riau</option><option value="SG">Sulawesi Barat</option><option value="SN">Sulawesi Selatan</option><option value="ST">Sulawesi Tengah</option><option value="SG">Sulawesi Tenggara</option><option value="SA">Sulawesi Utara</option><option value="SB">Sumatera Barat</option><option value="SS">Sumatera Selatan</option><option value="SU">Sumatera Utara</option><option value="YO">Yogyakarta</option>
			</select>
		</fieldset>

		<InputGroup id="postcode" type="text" label="Postal Code / ZIP" value="23423423" />
	<InputGroup id="tel" type="tel" label="Telephone" value="+6223423423423" />

		<button>Update</button>
	</div>
);
