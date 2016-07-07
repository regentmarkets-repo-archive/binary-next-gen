import React from 'react';
import MobilePage from '../containers/MobilePage';
import VerifyEmailCard from './VerifyEmailCard';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<VerifyEmailCard {...props} />
	</MobilePage>
);
