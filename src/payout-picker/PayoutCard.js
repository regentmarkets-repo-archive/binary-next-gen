import React, { PropTypes, Component } from 'react';
import NumberColored from '../_common/NumberColored';
import M from '../_common/M';
import Label from '../_common/Label';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class PayoutCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        stake: PropTypes.number.isRequired,
        payout: PropTypes.number.isRequired,
    };

    render() {
        const { stake, payout } = this.props;
        const potentialProfitPercentage = ((payout - stake) * 100 / stake).toFixed(2);

        return (
            <div className="payout-display">
                <Label text="Payout" />
                <div>
                    <NumberColored value={payout} isProfit={v => v - stake} className="payout-value" />
                    <span> ({potentialProfitPercentage}% <M m="return" />)</span>
                </div>
            </div>
        );
    }
}
