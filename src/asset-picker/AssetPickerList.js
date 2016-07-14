import React, { PropTypes, PureComponent } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends PureComponent {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets } = this.props;

		return (
			<div className="asset-list">
				{Object.keys(assets)
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
