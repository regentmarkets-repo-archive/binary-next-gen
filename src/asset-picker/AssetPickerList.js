import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import FlexList from '../containers/FlexList';
import AssetsPerSubmarket from './AssetsPerSubmarket';

export default class AssetPickerList extends Component {

	static propTypes = {
		assets: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		selectedAsset: PropTypes.string,
	};

	componentDidMount() {
		const focusedNode = findDOMNode(this.refs.focused);
		if (focusedNode) focusedNode.focus();
    }

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
							/>
						)
				}
			</FlexList>
		);
	}
}
