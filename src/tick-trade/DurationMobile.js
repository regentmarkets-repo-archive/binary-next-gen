import React from 'react';
import MobilePage from '../containers/MobilePage';
import DurationContainer from './DurationContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Duration">
		<DurationContainer {...props} />
	</MobilePage>
);
