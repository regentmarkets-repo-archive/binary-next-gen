import React, { PureComponent } from 'react';
import config from '../config';

export default class About extends PureComponent {

	render() {
		const { version } = config;

		return (
			<div className="about-card">
				<div className="version-info">Version: {version}</div>
				<div>
					<a href="https://play.google.com/store/apps/details?id=app.binary.com">
						<img src="//cdn.shopify.com/s/files/1/1292/2515/t/21/assets/google-play.png?9583987976215249385" alt="Get it on Google Play" />
					</a>
					<a href="https://itunes.apple.com/app/apple-store/id1134884301?pt=117911266&amp;ct=binary-shop&amp;mt=8">
						<img src="//cdn.shopify.com/s/files/1/1292/2515/t/21/assets/app-store.png?9583987976215249385" alt="Get it on App Store" />
					</a>
				</div>
			</div>
		);
	}
}
