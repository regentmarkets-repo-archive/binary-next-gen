import React, { PropTypes, PureComponent } from 'react';
import { NumberColored, M, Label } from 'binary-components';

export default class PayoutCard extends PureComponent {

    static propTypes = {
        currency: PropTypes.string.isRequired,
        stake: PropTypes.number,
        payout: PropTypes.number,
    };

    render() {
        const { currency, stake, payout } = this.props;

        const potentialProfitPercentage = (((payout - stake) * 100) / stake).toFixed(2);

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
