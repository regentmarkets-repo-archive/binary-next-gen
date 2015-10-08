import React from 'react';
import DesktopNavLink from './DesktopNavLink';

const DesktopToolbar = () => (
	<header>
    	<div className="header-content">
	        <a id="logo" href="https://www.binaryqa03.com/?l=EN">
	            <img src="https://borisyankov.github.io/binary-static/images/pages/binary-symbol-logo.svg" />
	            <img src="https://borisyankov.github.io/binary-static/images/pages/binary-text.svg" />
	        </a>
        	<nav>
	    		<ul className="nav1st">
					<DesktopNavLink to="/trade" text="Trade" />
					<DesktopNavLink to="/asset-index" text="Asset&nbsp;Index" />
					<DesktopNavLink to="/trading-times" text="Trading&nbsp;Times" />
					<DesktopNavLink to="/pricing-table" text="Pricing&nbsp;Table" />
					<DesktopNavLink to="/rise-fall-table" text="Rise/Fall&nbsp;Table" />
					<DesktopNavLink to="/balances" text="Balances" />
					<DesktopNavLink to="/Portfolio" text="Portfolio" />
					<DesktopNavLink to="/profit-table" text="Profit&nbsp;Table" />
					<DesktopNavLink to="/statement" text="Statement" />
					<DesktopNavLink to="/daily-prices" text="Daily&nbsp;Prices" />
					<DesktopNavLink to="/settings" text="Settings" />
				</ul>
			</nav>
		</div>
	</header>
);

export default DesktopToolbar;
