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
                    <svg width="20" height="20" viewBox="0 0 100 100">
                        <path fill="#aaa" d="M50.111 72.659c-1.061 0-2.078-0.422-2.829-1.172L17.275 41.474c-1.562-1.562-1.562-4.095 0.001-5.657 c1.563-1.562 4.096-1.562 5.7 0l27.178 27.185l27.178-27.185c1.562-1.562 4.095-1.562 5.7 0 c1.562 1.6 1.6 4.1 0 5.657L52.94 71.487C52.189 72.2 51.2 72.7 50.1 72.659z" />
                    </svg>
                </div>
            </div>
        );
    }
}
