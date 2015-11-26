import React from 'react';
import InputGroup from '../_common/InputGroup';

export default () => (
	<div className="mobile-form">
		<p>An additional password can be used to restrict access to the cashier.</p>
		<InputGroup
			id="cashierlockpassword1"
			label="Cashier password"
			type="password" />
		<InputGroup
			id="cashierlockpassword2"
			label="Re-enter your password"
			type="password" />
		<button>Update</button>
	</div>
);
