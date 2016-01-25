import React from 'react';
import { MobilePage } from '../_common';
import DurationContainer from './DurationContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Duration">
		<DurationContainer {...props} />
	</MobilePage>
);
