import React from 'react';
import { MobilePage } from '../common';
import SignupCard from './SignupCard';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<SignupCard {...props} />
	</MobilePage>
);
