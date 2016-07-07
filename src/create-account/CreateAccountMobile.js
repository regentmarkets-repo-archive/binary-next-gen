import React from 'react';
import MobilePage from '../containers/MobilePage';
import CreateAccountContainer from './CreateAccountContainer';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<CreateAccountContainer {...props} />
	</MobilePage>
);
