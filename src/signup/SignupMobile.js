import React from 'react';
import { MobilePage } from '../_common';
import SignupContainer from './SignupContainer';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<SignupContainer {...props} />
	</MobilePage>
);
