import React from 'react';
import { MobileToolbar } from '../navigation';

const MobilePage = (props) => (
	<div className="mobile-page">
		<div className="mobile-content">
			{props.toolbarShown ? <MobileToolbar /> : null}
			{props.children}
		</div>
	</div>
);

MobilePage.propTypes = {
	children: React.PropTypes.any,
	toolbarShown: React.PropTypes.bool,
};

MobilePage.defaultProps = {
	toolbarShown: true,
};

export default MobilePage;
