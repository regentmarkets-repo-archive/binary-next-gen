import React from 'react';
import { MobilePage } from '../common';
import LoginCard from './LoginCard';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<LoginCard {...props} />
	</MobilePage>
);
