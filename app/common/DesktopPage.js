import React from 'react';
import { DesktopToolbar } from '../navigation';

const DesktopPage = ({children}) => (
	<div className="desktop-page">
		<DesktopToolbar />
		{children}
	</div>
);

DesktopPage.propTypes = {
	children: React.PropTypes.any,
};

export default DesktopPage;
