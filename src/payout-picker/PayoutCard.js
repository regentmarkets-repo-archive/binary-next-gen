import React, { PureComponent } from 'react';
import { NumberColored, M, Label } from 'binary-components';

export default class PayoutCard extends PureComponent {
    props: {
        currency: string,
        stake: number,
        payout: number,
    };

    render() {
        const { currency, stake, payout } = this.props;
        const show = payout && stake;
        const potentialProfitPercentage = ((payout - stake) *
            100 /
            stake).toFixed(2);

        return (
            <div className="param-row payout-display">
                <Label text="Payout" />
                <div className="param-field">
                    {show
                        ? <NumberColored
                              className="payout-value"
                              currency={currency}
                              value={payout}
                              isProfit={v => v - stake}
                          />
                        : <span className="payout-value">&nbsp;</span>}
                    {show
                        ? <span>
                              {potentialProfitPercentage}% <M m="return" />
                          </span>
                        : <span>&nbsp;</span>}
                </div>
            </div>
        );
    }
}
