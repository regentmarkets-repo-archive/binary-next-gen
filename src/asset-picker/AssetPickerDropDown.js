import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from './AssetPickerContainer';

export default class AssetPickerDropDown extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        actions: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        selectedSymbol: PropTypes.string.isRequired,
        selectedSymbolName: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
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
                    onMouseDown={() => this.setState({ dropdownShown: true })}
                >
                    {selectedSymbolName}
                </div>
            </div>
        );
    }
}
