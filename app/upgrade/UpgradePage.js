import React from 'react';
import { MobilePage } from '../_common';
import UpgradePane from './UpgradePane';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradePane {...props} />
	</MobilePage>
);
