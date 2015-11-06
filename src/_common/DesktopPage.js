import React from 'react';
import { DesktopHeader, DesktopSidebar } from '../navigation';

const DesktopPage = ({children}) => (
	<div className="desktop-page">
		<DesktopHeader />
		<DesktopSidebar />
		<div className="desktop-content">
			{children}
		</div>
	</div>
);

DesktopPage.propTypes = {
	children: React.PropTypes.any,
};

export default DesktopPage;
