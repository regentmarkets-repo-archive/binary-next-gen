import React from 'react';
import { MobilePage } from '../_common';
import NewsContainer from './NewsContainer';

export default (props) => (
	<MobilePage>
		<NewsContainer compact {...props} />
	</MobilePage>
);
