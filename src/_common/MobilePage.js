import React, { PropTypes } from 'react';
import { MobileToolbarFull, MobileToolbarBack } from '../navigation';

const MobilePage = ({ backBtnBarTitle, children, toolbarShown, inverse, backTo }) => (
	<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
		{toolbarShown ? <MobileToolbarFull /> : null}
		{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} to={backTo} /> : null}
		<div className="mobile-content">
			{children}
		</div>
	</div>
);

MobilePage.propTypes = {
	backBtnBarTitle: PropTypes.string,
	children: PropTypes.any,
	toolbarShown: PropTypes.bool,
	inverse: PropTypes.bool,
};

MobilePage.defaultProps = {
	toolbarShown: true,
};

export default MobilePage;
