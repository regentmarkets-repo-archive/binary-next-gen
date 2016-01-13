import React, { PropTypes, Component } from 'react';
import MobileChart from '../charting/MobileChart';
import { SelectGroup } from '../_common';
import FullTradeCategorySelector from './FullTradeCategorySelector';
import FullTradeTypeSelector from './FullTradeTypeSelector';
import FullTradePayout from './FullTradePayout';

export default class FullTradeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAssets: false,
            showTradingType: false,
        };
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        priceProposalID: PropTypes.string,
        availableAssets: PropTypes.array.isRequired,
        selectedAsset: PropTypes.string.isRequired,
        tradingTypeInfo: PropTypes.object.isRequired,
        contractOptions: PropTypes.array.isRequired,
        payoutInfo: PropTypes.object.isRequired,
        ticksInfo: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    updateParams(name, value) {
        const { actions, id } = this.props;
        actions.updateTradeParams(id, name, value);
        actions.updatePriceProposalSubscription(id);
    }

    updateAssetSelected(symbol) {
        this.updateParams('symbol', symbol);
    }

    updateTradeCategory(category) {
        this.updateParams('tradeCategory', category);
    }

    updateTradeType(type) {
        this.updateParams('type', type);
    }

    updateDuration(duration) {
        this.updateParams('duration', duration);
    }

    updateDurationUnit(unit) {
        this.updateParams('durationUnit', unit);
    }

    updateBasis(basis) {
        this.updateParams('basis', basis);
    }

    updateAmount(amount) {
        this.updateParams('amount', amount);
    }

    render() {
        const { selectedAsset, availableAssets, tradingTypeInfo, contractOptions, payoutInfo, ticksInfo } = this.props;

        return (
            <div>
                <MobileChart history={ticksInfo.ticks} />
                <div className="row">
                    <SelectGroup options={availableAssets} value={selectedAsset} />
                    <FullTradeCategorySelector {...tradingTypeInfo} />
                </div>
                <FullTradeTypeSelector contractOptions={contractOptions} />
                <FullTradePayout {...payoutInfo} />
            </div>
        );
    }
}
