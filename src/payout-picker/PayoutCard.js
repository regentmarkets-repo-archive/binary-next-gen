import React, { PropTypes, Component } from 'react';
import NumberColored from 'binary-components/lib/NumberColored';
import M from 'binary-components/lib/M';
import Label from 'binary-components/lib/Label';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class PayoutCard extends Component {

    static propTypes = {
        currency: PropTypes.string.isRequired,
        stake: PropTypes.number,
        payout: PropTypes.number,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { currency, stake, payout } = this.props;

        const potentialProfitPercentage = ((payout - stake) * 100 / stake).toFixed(2);

        return (
            <div className="param-row payout-display">
                <Label text="Payout" />
                {(payout && stake) ? <div className="param-field">
                    <NumberColored
                        className="payout-value"
                        currency={currency}
                        value={payout}
                        isProfit={v => v - stake}
                    />
                    &nbsp;
                    <span>({potentialProfitPercentage}% <M m="return" />)</span>
                </div> : null}
            </div>
        );
    }
}
