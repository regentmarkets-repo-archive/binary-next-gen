import React from 'react';
import MobilePage from '../containers/MobilePage';
import CreateAccountCard from './CreateAccountCard';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<CreateAccountCard {...props} />
	</MobilePage>
);
