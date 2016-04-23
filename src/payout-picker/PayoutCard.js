import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberColored from '../_common/NumberColored';
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
            <div>
                <div>
                    <M m="Earning (%)" className="label" />
                </div>
                <NumberColored value={payout} isProfit={v => v - stake} />
                <M id="earning-percentage" m="({profit} %)" values={{ profit: potentialProfitPercentage }} />
            </div>
        );
    }
}
