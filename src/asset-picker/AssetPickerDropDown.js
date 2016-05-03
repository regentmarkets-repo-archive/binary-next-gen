import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from './AssetPickerContainer';

export default class AssetPickerDropDown extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        actions: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        index: PropTypes.number.isRequired,
        history: PropTypes.object.isRequired,
        selectedSymbol: PropTypes.string.isRequired,
        selectedSymbolName: PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    openAssetPicker() {
        const { compact } = this.props;
        const { router } = this.context;
        if (!compact) {
            this.setState({ dropdownShown: true });
        } else {
            router.push('asset-picker');
        }
    }

    render() {
        const { actions, index, selectedSymbol, selectedSymbolName } = this.props;
        const { dropdownShown } = this.state;
        return (
            <div>
                <DropDown
                    shown={dropdownShown}
                    onClose={() => this.setState({ dropdownShown: false })}
                >
                    <AssetPickerContainer
                        actions={actions}
                        tradeIdx={index}
                        selectedAsset={selectedSymbol}
                    />
                </DropDown>
                <div
                    className="picker-label"
                    onMouseDown={::this.openAssetPicker}
                >
                    {selectedSymbolName}
                </div>
            </div>
        );
    }
}
