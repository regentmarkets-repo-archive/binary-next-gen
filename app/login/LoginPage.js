import React from 'react';
import { MobilePage } from '../common';
import LoginPane from './LoginPane';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<LoginPane {...props} />
	</MobilePage>
);
