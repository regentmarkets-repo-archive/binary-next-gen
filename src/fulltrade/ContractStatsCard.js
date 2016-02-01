import React, { PropTypes, Component } from 'react';
import { LabeledText, M } from '../_common';

export default class ContractStatsCard extends Component {
    static propTypes = {
        proposal: PropTypes.object,
        spread: PropTypes.bool,
    };

    render() {
        const { proposal, spread } = this.props;
        const cost = proposal.ask_price;
        const winning = spread ? proposal.payout : (proposal.payout - cost).toFixed(2);
        const winningPercent = (winning / cost * 100).toFixed(2);
        return (
            <div className="name-val-pairs">
                <LabeledText
                    label={spread ? 'Maximum loss' : 'Cost'}
                    value={cost.toString()}
                />
                <LabeledText
                    label={spread ? 'Maximum winning' : 'Potential Winning'}
                    value={spread ? winning.toString() : `${winning} (${winningPercent}%)` }
                />
                <M m={proposal.longcode}/>
            </div>
        );
    }
}
