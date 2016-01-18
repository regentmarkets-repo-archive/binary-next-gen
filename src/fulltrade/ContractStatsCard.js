import React, { PropTypes, Component } from 'react';
import { LabeledText, M } from '../_common';

export default class ContractStatsCard extends Component {
    static propTypes = {
        proposal: PropTypes.object,
    };

    render() {
        const { proposal } = this.props;
        const spot = proposal.spot;
        const cost = proposal.ask_price;
        const winning = (proposal.payout - cost, 2).toFixed(2);
        const winningPercent = (winning / cost * 100).toFixed(2);
        return (
            <div className="name-val-pairs">
                <LabeledText label="Current Spot" value={spot.toString()}/>
                <LabeledText label="Cost" value={cost.toString()}/>
                <LabeledText label="Potential Winning" value={winning.toString()}/>
                <LabeledText label="Potential Winning" value={winningPercent.toString() + '%'}/>
                <M m={proposal.longcode}/>
            </div>
        );
    }
}
