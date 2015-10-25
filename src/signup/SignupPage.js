import React from 'react';
import { MobilePage } from '../_common';
import SignupCard from './SignupCard';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<SignupCard {...props} />
	</MobilePage>
);
