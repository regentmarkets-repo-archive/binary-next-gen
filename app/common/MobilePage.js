import React from 'react';
import { MobileToolbar } from '../navigation';

const MobilePage = (props) => (
	<div className="mobile-page">
		<div className="mobile-content">
			<MobileToolbar />
			{props.children}
		</div>
	</div>
);

MobilePage.propTypes = {
	children: React.PropTypes.any,
};

export default MobilePage;
