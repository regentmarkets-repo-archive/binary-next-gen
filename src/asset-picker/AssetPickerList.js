import React, { PropTypes, PureComponent } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends PureComponent {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		onClose: PropTypes.func,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets } = this.props;
		const sorted = Object.keys(assets)		// prioritize Volatile assets
			.sort(a => {
				if (a === 'Daily Reset Indices') {
					return -1;
				}

				if (a === 'Continuous Indices') {
					return -2;
				}

				return 1;
			});
		return (
			<div className="asset-list scrollable">
				{sorted
					.map(submarketName =>
						<AssetsPerSubmarket
							{...this.props}
							key={submarketName}
							assetsInSubmarket={assets[submarketName]}
							ref={submarketName}
						/>
					)
				}
			</div>
		);
	}
}
