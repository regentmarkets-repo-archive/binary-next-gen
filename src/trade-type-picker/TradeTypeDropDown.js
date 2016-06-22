import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
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

export default class TradeTypeDropDown extends Component {

    static propTypes = {
        compact: PropTypes.bool,
        tradeParams: PropTypes.object.isRequired,
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

    shouldComponentUpdate = shouldPureComponentUpdate;

    openTradeTypePicker = () => {
        const { compact } = this.props;
        const { router } = this.context;
        if (compact) {
            router.push('trade-type-picker');
        } else {
            this.setState({ dropdownShown: true });
        }
    }

    close = () => this.setState({ dropdownShown: false });

    render() {
        const { tradeParams } = this.props;
        const selectedType = getInternalTradeType(tradeParams);
        const { dropdownShown } = this.state;
        return (
            <div className="param-row">
                <DropDown
                    shown={dropdownShown}
                    onClose={this.close}
                >
                    <TradeTypePicker
                        {...this.props}
                        onSelect={this.close}
                    />
                </DropDown>
                <Label text="Trade Type" />
                <Info tooltip={helpText[selectedType]} role="presentation" />
                <div
                    className="picker-label param-field"
                    onMouseDown={this.openTradeTypePicker}
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
