import React from 'react';
import { MobilePage } from '../common';
import SignupPane from './SignupPane';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<SignupPane {...props} />
	</MobilePage>
);
