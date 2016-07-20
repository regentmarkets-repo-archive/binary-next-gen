import React, { PropTypes, PureComponent } from 'react';
import Label from 'binary-components/lib/Label';
import DownArrow from 'binary-components/lib/DownArrow';
import DropDown from '../containers/DropDown';
import { actions } from '../_store';
import AssetPickerContainer from './AssetPickerContainer';

export default class AssetPickerDropDown extends PureComponent {

    static propTypes = {
        index: PropTypes.number.isRequired,
        selectedSymbol: PropTypes.string.isRequired,
        selectedSymbolName: PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    onClose = () => {
        actions.resetAssetPickerFilter();
        this.setState({ dropdownShown: false });
    }

    openPicker = () =>
        this.setState({ dropdownShown: true });

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
                    />
                </DropDown>
                <Label text="Asset" />
                <div className="picker-label param-field" onMouseDown={this.openPicker}>
                    {selectedSymbolName}
                    <DownArrow />
                </div>
            </div>
        );
    }
}
