import React from 'react';
import { InputGroup, M } from '../_common';

export default () => (
	<div className="mobile-form">
		<p>
			<M m="An additional password can be used to restrict access to the cashier."/>
		</p>
		<InputGroup
			id="cashierlockpassword1"
			label="Cashier password"
			type="password" />
		<InputGroup
			id="cashierlockpassword2"
			label="Re-enter your password"
			type="password" />
		<button>
			<M m="Update" />
		</button>
	</div>
);
