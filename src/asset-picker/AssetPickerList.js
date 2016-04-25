import React, { PropTypes, Component } from 'react';
import FlexList from '../containers/FlexList';
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
			<FlexList>
				{
					Object.keys(assets)
						.map(submarketName =>
							<AssetsPerSubmarket
								{...this.props}
								key={submarketName}
								assetsInSubmarket={assets[submarketName]}
								ref={submarketName}
							/>
						)
				}
			</FlexList>
		);
	}
}
