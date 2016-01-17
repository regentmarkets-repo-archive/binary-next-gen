import React, { PropTypes, Component } from 'react';
import { LabeledText } from '../_common';

export default class ContractStatsCard extends Component {
    static propTypes = {
        proposal: PropTypes.object,
    };

    render() {
        const { proposal } = this.props;
        const cost = proposal.ask_price;
        const winning = proposal.payout - cost;
        const winningPercent = winning / cost * 100;
        return (
            <div className="name-val-pairs">
                <LabeledText label="Cost" value={cost.toString()}/>
                <LabeledText label="Potential Winning" value={winning.toString()}/>
                <LabeledText label="Potential Winning" value={winningPercent.toString()}/>
            </div>
        );
    }
}
