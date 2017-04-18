import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { OpenCloseNotice, DownArrow } from 'binary-components';
import { actions } from '../_store';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import examineAssetSelectors from './examineAssetSelectors';

@connect(examineAssetSelectors)
export default class ExamineAssetFilter extends PureComponent {
    props: {
        asset: object,
    };

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }

    onClose = () => this.setState({ dropdownShown: false });

    onChangeAsset = newAsset => {
        actions.changeExaminedAsset(newAsset);
    };

    openPicker = () => {
        actions.resetAssetPickerFilter();
        this.setState({ dropdownShown: true });
    };

    render() {
        const { dropdownShown } = this.state;
        const { asset } = this.props;

        return (
            <div className="examine-asset-picker-container">
                <div
                    className="examine-asset-picker picker-label"
                    onMouseDown={this.openPicker}
                >
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
