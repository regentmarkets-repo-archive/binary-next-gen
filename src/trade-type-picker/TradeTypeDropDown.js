import React, { PureComponent } from 'react';
import { tradeToFriendlyType } from 'binary-utils';
import { Label, Info, DownArrow, M } from 'binary-components';
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

    props: {
        index: number,
        contract: Contract,
        tradeParams: object,
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
                        onClose={this.onClose}
                    />
                </DropDown>
                <Label text="Trade" />
                <Info tooltip={helpText[selectedType]} role="presentation" />
                <div
                    className="picker-label param-field"
                    onClick={this.openPicker}
                >
                    <img
                        src={`img/trade-${selectedType.toLowerCase()}.svg`}
                        alt={selectedType}
                    />
                    <M className="picker-value" m={tradeToFriendlyType(selectedType, tradeParams.barrier)} />
                    <DownArrow />
                </div>
            </div>
        );
    }
}
