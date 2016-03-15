import React, { PropTypes, Component } from 'react';
import LabeledText from '../../_common/LabeledText';
import LabeledDateTime from '../../_common/LabeledDateTime';

export default class RiseFallContractDetails extends Component {
    static propTypes = {
        barrier: PropTypes.number.isRequired,
        contractId: PropTypes.string.isRequired,
        currentSpot: PropTypes.number,
        currentPrice: PropTypes.number,
        currentTime: PropTypes.number.isRequired,
        entryPrice: PropTypes.number.isRequired,
        entryEpoch: PropTypes.number.isRequired,
        entrySpot: PropTypes.number.isRequired,
        sellPrice: PropTypes.number,
        sellSpot: PropTypes.number,
        sellTime: PropTypes.number,
        type: PropTypes.oneOf(['high', 'low']),
        ended: PropTypes.bool.isRequired,
    };

    render() {
        const {
            barrier,
            contractId,
            currentSpot,
            currentPrice,
            currentTime,
            ended,
            entryPrice,
            entryEpoch,
            entrySpot,
            sellPrice,
            sellSpot,
            sellTime,
            type,
            } = this.props;

        const dynamicPriceLabel = ended ? 'Final Price' : 'Current Price';
        const dynamicPriceValue = ended ? sellPrice : currentPrice;
        const dynamicSpotLabel = ended ? 'Final Spot' : 'Current Spot';
        const dynamicSpotValue = ended ? sellSpot : currentSpot;
        const dynamicTimeLabel = ended ? 'Final Time' : 'Current Time';
        const dynamicTimeValue = ended ? sellTime : currentTime;

        return (
            <div>
                <LabeledText label="Entry Price" value={entryPrice} />
                <LabeledText label="Entry Spot" value={entrySpot} />
                <LabeledDateTime label="Entry Time" value={entryEpoch} />
                <LabeledText label={dynamicPriceLabel} value={dynamicPriceValue} />
                <LabeledText label={dynamicSpotLabel} value={dynamicSpotValue} />
                <LabeledDateTime label={dynamicTimeLabel} value={dynamicTimeValue} />
            </div>
        );
    }
}
