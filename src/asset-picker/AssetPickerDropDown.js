import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from './AssetPickerContainer';

export default class AssetPickerDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    static propTypes = {
        actions: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        selectedSymbol: PropTypes.string.isRequired,
        selectedSymbolName: PropTypes.string.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { actions, index, selectedSymbol, selectedSymbolName } = this.props;
        const { show } = this.state;
        return (
            <div>
                <DropDown
                    shown={show}
                    onClose={() => this.setState({ show: false })}
                >
                    <AssetPickerContainer
                        actions={actions}
                        tradeIdx={index}
                        selectedAsset={selectedSymbol}
                    />
                </DropDown>
                <div
                    className="picker-label"
                    onMouseDown={() => this.setState({ show: true })}
                >
                    {selectedSymbolName}
                </div>
            </div>
        );
    }
}
