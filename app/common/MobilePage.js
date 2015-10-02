import React from 'react';
import { MobileToolbar } from '../navigation';

const MobilePage = (props) => (
	<div className="mobile-page">
		<MobileToolbar />
		{props.children}
	</div>
);

MobilePage.propTypes = {
	children: React.PropTypes.any,
};

export default MobilePage;
