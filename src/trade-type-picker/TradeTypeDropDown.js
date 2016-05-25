import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import tradeToFriendlyType from 'binary-utils/lib/tradeToFriendlyType';
import Label from '../_common/Label';
import DownArrow from '../_common/DownArrow';
import DropDown from '../containers/DropDown';
import TradeTypePicker from './TradeTypePicker';
import helpText from './helpText';

export default class TradeTypeDropDown extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        compact: PropTypes.bool,
        tradeParams: PropTypes.object.isRequired,
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

    openTradeTypePicker() {
        const { compact } = this.props;
        const { router } = this.context;
        if (compact) {
            router.push('trade-type-picker');
        } else {
            this.setState({ dropdownShown: true });
        }
    }

    render() {
        const { tradeParams } = this.props;
        const selectedType = tradeParams.type;
        const { typeText } = tradeParams;
        const { dropdownShown } = this.state;
        return (
            <div>
                <DropDown
                    shown={dropdownShown}
                    onClose={() => this.setState({ dropdownShown: false })}
                >
                    <TradeTypePicker
                        {...this.props}
                        onSelect={() => this.setState({ dropdownShown: false })}
                    />
                </DropDown>
                <Label text="Trade Type" />
                <img className="info-icon" src="img/info.svg" title={helpText[tradeParams.type]} role="presentation" />
                <div
                    className="picker-label"
                    onMouseDown={::this.openTradeTypePicker}
                >
                    <img
                        src={`img/trade-${tradeParams.type.toLowerCase()}.svg`}
                        alt={tradeParams.type}
                    />
                    {tradeToFriendlyType((typeText || selectedType), tradeParams.barrier)}
                    <DownArrow />
                </div>
            </div>
        );
    }
}
