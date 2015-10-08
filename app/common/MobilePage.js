import React from 'react';
import { MobileToolbar } from '../navigation';

const MobilePage = ({children, toolbarShown}) => (
	<div className="mobile-page">
		<div className="mobile-content">
			{toolbarShown ? <MobileToolbar /> : null}
			{children}
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
