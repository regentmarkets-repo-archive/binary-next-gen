import React from 'react';
import MobilePage from '../containers/MobilePage';
import HelloCard from './HelloCard';

export default (props) => (
	<MobilePage toolbarShown={false} inverse>
		<HelloCard {...props} />
	</MobilePage>
);
