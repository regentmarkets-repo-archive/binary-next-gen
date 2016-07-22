import React, { PureComponent, PropTypes } from 'react';
import tradeToFriendlyType from 'binary-utils/lib/tradeToFriendlyType';
import Label from 'binary-components/lib/Label';
import Info from 'binary-components/lib/Info';
import DownArrow from 'binary-components/lib/DownArrow';
import DropDown from '../containers/DropDown';
import TradeTypePicker from './TradeTypePicker';
import helpText from './helpText';

const getInternalTradeType = tradeParams => {
    const { type, barrier } = tradeParams;
    if (barrier) {
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
        forceTradeCardUpdate: PropTypes.func.isRequired,
        tradeParams: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropdownShown: false,
        };
    }

    openPicker = () =>
        this.setState({ dropdownShown: true });

    onClose = () =>
        this.setState({ dropdownShown: false });

    render() {
        const { tradeParams } = this.props;
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
                        {...this.props}
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
