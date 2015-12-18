import React from 'react';
import { MobilePage } from '../_common';
import UpgradeContainer from './UpgradeContainer';

export default (props) => (
	<MobilePage toolbarShown={false}>
		<UpgradeContainer {...props} />
	</MobilePage>
);
