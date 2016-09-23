import React, { PureComponent } from 'react';
import { Label, DownArrow } from 'binary-components';
import DropDown from '../containers/DropDown';
import { actions } from '../_store';
import AssetPickerContainer from './AssetPickerContainer';

type Props = {
    index: number,
    selectedSymbol: string,
    selectedSymbolName: string,
};

export default class AssetPickerDropDown extends PureComponent {

    props: Props;

    static contextTypes = {
        router: () => undefined,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    onClose = () =>
        this.setState({ dropdownShown: false });

    onSelect = newAsset => {
		const { index } = this.props;
		actions.reqSymbolChange(index, newAsset);
	}

    openPicker = () => {
        actions.resetAssetPickerFilter();
        this.setState({ dropdownShown: true });
    }

    render() {
        const { index, selectedSymbol, selectedSymbolName } = this.props;
        const { dropdownShown } = this.state;

        return (
            <div className="param-row">
                <DropDown
                    shown={dropdownShown}
                    title="Assets"
                    onClose={this.onClose}
                >
                    <AssetPickerContainer
                        index={index}
                        selectedAsset={selectedSymbol}
                        onSelect={this.onSelect}
                    />
                </DropDown>
                <Label text="Asset" />
                <div className="picker-label param-field" onMouseDown={this.openPicker}>
                    <div className="picker-value">{selectedSymbolName}</div>
                    <DownArrow />
                </div>
            </div>
        );
    }
}
