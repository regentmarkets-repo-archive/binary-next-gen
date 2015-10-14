import React from 'react';
import { MobileToolbar } from '../navigation';

const MobilePage = ({children, toolbarShown, inverse}) => (
	<div className="mobile-screen">
		<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
			{toolbarShown ? <MobileToolbar /> : null}
			<div className="mobile-content">
				{children}
			</div>
		</div>
	</div>
);

MobilePage.propTypes = {
	children: React.PropTypes.any,
	toolbarShown: React.PropTypes.bool,
	inverse: React.PropTypes.bool,
};

MobilePage.defaultProps = {
	toolbarShown: true,
};

export default MobilePage;
