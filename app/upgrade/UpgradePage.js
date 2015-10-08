import React from 'react';
import { MobilePage } from '../common';
import UpgradePane from './UpgradePane';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradePane {...props} />
	</MobilePage>
);
