import React from 'react';
import MobilePage from '../containers/MobilePage';
import SigninContainer from './SigninContainer';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<SigninContainer {...props} />
	</MobilePage>
);
