import React from 'react';
import MobilePage from '../containers/MobilePage';
import TickDurationContainer from './TickDurationContainer';

export default (props) => (
	<MobilePage toolbarShown={false} backBtnBarTitle="Duration">
		<TickDurationContainer {...props} />
	</MobilePage>
);
