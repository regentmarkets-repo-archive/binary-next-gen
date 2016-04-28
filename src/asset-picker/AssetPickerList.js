import React, { PropTypes, Component } from 'react';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends Component {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets } = this.props;

		return (
			<div>
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
