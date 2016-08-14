import React, { PureComponent, PropTypes } from 'react';
import { tradeToFriendlyType } from 'binary-utils';
import { Label, Info, DownArrow } from 'binary-components';
import DropDown from '../containers/DropDown';
import TradeTypePicker from './TradeTypePicker';
import helpText from './helpText';

const getInternalTradeType = tradeParams => {
    const { type, tradeCategory } = tradeParams;
    if (tradeCategory === 'higherlower') {
        if (type === 'CALL') {
            return 'HIGHER';
        }
        if (type === 'PUT') {
            return 'LOWER';
        }
    }
    return tradeParams.type;
};

export default class TradeTypeDropDown extends PureComponent {

    static propTypes = {
        index: PropTypes.number.isRequired,
        contract: PropTypes.object.isRequired,
        tradeParams: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    onClose = () =>
        this.setState({ dropdownShown: false });

    openPicker = () =>
        this.setState({ dropdownShown: true });

    render() {
        const { tradeParams, index, contract } = this.props;
        const { dropdownShown } = this.state;
        const selectedType = getInternalTradeType(tradeParams);
        return (
            <div className="param-row">
                <DropDown
                    shown={dropdownShown}
                    title="Trade Type"
                    onClose={this.onClose}
                >
                    <TradeTypePicker
                        index={index}
                        contract={contract}
                        tradeParams={tradeParams}
                        onSelect={this.onClose}
                    />
                </DropDown>
                <Label text="Trade Type" />
                <Info tooltip={helpText[selectedType]} role="presentation" />
                <div
                    className="picker-label param-field"
                    onMouseDown={this.openPicker}
                >
                    <img
                        src={`img/trade-${selectedType.toLowerCase()}.svg`}
                        alt={selectedType}
                    />
                    {tradeToFriendlyType(selectedType, tradeParams.barrier)}
                    <DownArrow />
                </div>
            </div>
        );
    }
}
