import React from 'react';
import { MobileToolbarFull, MobileToolbarBack } from '../navigation';

const MobilePage = ({backBtnBarTitle, children, toolbarShown, inverse}) => (
	<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
		{toolbarShown ? <MobileToolbarFull /> : null}
		{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} /> : null}
		<div className="mobile-content">
			{children}
		</div>
	</div>
);

MobilePage.propTypes = {
	backBtnBarTitle: React.PropTypes.string,
	children: React.PropTypes.any,
	toolbarShown: React.PropTypes.bool,
	inverse: React.PropTypes.bool,
};

MobilePage.defaultProps = {
	toolbarShown: true,
};

export default MobilePage;
