import React from 'react';
import { MobilePage } from '../_common';
import SigninContainer from './SigninContainer';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<SigninContainer {...props} />
	</MobilePage>
);
