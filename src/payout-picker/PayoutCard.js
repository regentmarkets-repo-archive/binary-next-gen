import React, { PropTypes, Component } from 'react';
import NumberColored from 'binary-components/lib/NumberColored';
import M from 'binary-components/lib/M';
import Label from 'binary-components/lib/Label';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class PayoutCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        currency: PropTypes.string.isRequired,
        stake: PropTypes.number.isRequired,
        payout: PropTypes.number.isRequired,
    };

    render() {
        const { currency, stake, payout } = this.props;
        const potentialProfitPercentage = ((payout - stake) * 100 / stake).toFixed(2);

        return (
            <div className="param-row payout-display">
                <Label text="Payout" />
                <div>
                    <NumberColored
                        className="payout-value"
                        currency={currency}
                        value={payout}
                        isProfit={v => v - stake}
                    />
                    <span> ({potentialProfitPercentage}% <M m="return" />)</span>
                </div>
            </div>
        );
    }
}
