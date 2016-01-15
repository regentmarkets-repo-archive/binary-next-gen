import React, { PropTypes, Component } from 'react';
import MobileChart from '../charting/MobileChart';
import { SelectGroup } from '../_common';
import FullTradeCategorySelector from './FullTradeCategorySelector';
import FullTradeTypeSelector from './FullTradeTypeSelector';
import FullTradePayout from './FullTradePayout';

export default class FullTradeCard extends Component {
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

    componentWillReceiveProps(nextProps) {
        const { tradingTypeInfo, contractOptions } = nextProps;
        const { allCategories, selectedCategory, selectedType } = tradingTypeInfo;

        // set default for tradeCategory if needed
        if (!allCategories.find(ctg => ctg.value === selectedCategory) && allCategories[0]) {
            this.updateTradeCategory(allCategories[0].value);
        }

        // set default for tradeType if needed
        if (!contractOptions.find(opt => opt.value === selectedType) && contractOptions[0]) {
            this.updateTradeType(contractOptions[0].value);
        }

        // set default for duration if needed
        const selectedOptions = contractOptions.find(opt => opt.value === selectedType);
        if (selectedOptions) {
            const { min, max, duration } = selectedOptions.durationInfo;
            if (duration > max || duration < min) {
                this.updateDuration(min);
            }
        }
    }

    updateParams(name, value) {
        const { actions, id } = this.props;
        actions.updateTradeParams(id, name, value);
        actions.updatePriceProposalSubscription(id);
    }

    updateAssetSelected(symbol) {
        const { actions } = this.props;
        this.updateParams('symbol', symbol);
        actions.getTradingOptions(symbol);
        actions.getTicksBySymbol(symbol);
    }

    updateTradeCategory(category) {
        this.updateParams('tradeCategory', category);
    }

    updateTradeType(type) {
        this.updateParams('type', type);
    }

    updateDuration(duration) {
        this.updateParams('duration', +duration);
    }

    updateDurationUnit(unit) {
        this.updateParams('durationUnit', unit);
    }

    updateBarrier1(barrier) {
        this.updateParams('barrier', barrier);      // it's barrier not barrier1, as this is what backend return
    }

    updateBarrier2(barrier) {
        this.updateParams('barrier2', barrier);
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
                    <SelectGroup
                        options={availableAssets}
                        value={selectedAsset}
                        onChange={e => this.updateAssetSelected(e.target.value)}
                    />
                    <FullTradeCategorySelector
                        onCategoryChange={::this.updateTradeCategory}
                        {...tradingTypeInfo}
                    />
                </div>
                <FullTradeTypeSelector
                    contractOptions={contractOptions}
                    onTypeChange={::this.updateTradeType}
                    onDurationChange={::this.updateDuration}
                    onDurationUnitChange={::this.updateDurationUnit}
                    onBarrier1Change={::this.updateBarrier1}
                    onBarrier2Change={::this.updateBarrier2}
                    selectedType={tradingTypeInfo.selectedType}
                />
                <FullTradePayout {...payoutInfo}
                    onAmountChange={::this.updateAmount}
                    onBasisChange={::this.updateBasis}
                />
            </div>
        );
    }
}
