import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { OpenCloseNotice, DownArrow } from 'binary-components';
import { actions } from '../_store';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import examinedAssetSelectors from './examinedAssetSelectors';

@connect(examinedAssetSelectors)
export default class AssetInfoFilter extends PureComponent {

	static propTypes = {
		asset: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	openPicker = () =>
        this.setState({ dropdownShown: true });

	onClose = () =>
		this.setState({ dropdownShown: false });

	onChangeAsset = newAsset => {
		actions.changeexaminedAsset(newAsset);
	}

	render() {
		const { dropdownShown } = this.state;
		const { asset } = this.props;

		return (
			<div>
				<div className="asset-info-picker picker-label" onMouseDown={this.openPicker}>
					<h4>{asset.name}</h4>
					<DownArrow />
					<OpenCloseNotice isOpen={asset.isOpen} />
				</div>
				<DropDown
					shown={dropdownShown}
					title="Assets"
					onClose={this.onClose}
				>
					<AssetPickerContainer
						selectedAsset={asset.symbol}
						onSelect={this.onChangeAsset}
						onClose={this.onClose}
					/>
				</DropDown>
			</div>
		);
	}
}
