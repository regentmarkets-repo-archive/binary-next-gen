import React from 'react';
import MobilePage from '../mobile/MobilePage';
import NewsContainer from './NewsContainer';

export default (props) => (
	<MobilePage>
		<NewsContainer {...props} />
	</MobilePage>
);
