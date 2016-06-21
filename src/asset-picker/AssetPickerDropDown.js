import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Label from 'binary-components/lib/Label';
import DropDown from '../containers/DropDown';
import DownArrow from 'binary-components/lib/DownArrow';
import AssetPickerContainer from './AssetPickerContainer';

export default class AssetPickerDropDown extends Component {

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

    componentDidMount() {
        document.addEventListener('keydown', this.closeOnEscape, false);
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeOnEscape, false);
    }

    onClose = () => {
        const { actions } = this.props;
        actions.resetAssetPickerFilter();
        this.setState({ dropdownShown: false });
    }

    closeOnEscape = (evt) => {
        if (evt.keyCode === 27) {
            this.onClose();
        }
    }

    openAssetPicker = () => {
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
            <div className="param-row">
                <DropDown shown={dropdownShown} onClose={this.onClose}>
                    <AssetPickerContainer
                        actions={actions}
                        tradeIdx={index}
                        selectedAsset={selectedSymbol}
                    />
                </DropDown>
                <Label text="Asset" />
                <div className="picker-label param-field" onMouseDown={this.openAssetPicker}>
                    {selectedSymbolName}
                    <DownArrow />
                </div>
            </div>
        );
    }
}
