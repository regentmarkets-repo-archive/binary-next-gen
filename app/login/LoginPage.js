import React from 'react';
import { MobilePage } from '../_common';
import LoginCard from './LoginCard';

export default (props) => (
	<MobilePage toolbarShown={false} inverse={true}>
		<LoginCard {...props} />
	</MobilePage>
);
