import React, { PropTypes, Component } from 'react';
import MobileChart from '../charting/MobileChart';
import { SelectGroup } from '../_common';
import FullTradeCategoryPicker from './FullTradeCategoryPicker';
import FullTradeTypePicker from './FullTradeTypePicker';
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
        proposal: PropTypes.object,
        actions: PropTypes.object.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const { selectedAsset, tradingTypeInfo, contractOptions } = nextProps;
        const { allCategories, selectedCategory } = tradingTypeInfo;

        // set default for tradeCategory if needed
        if (selectedAsset !== this.props.selectedAsset) {
            this.updateTradeCategory(allCategories[0].value);
        }

        // set default for tradeType if needed
        if (selectedCategory !== this.props.tradingTypeInfo.selectedCategory) {
            this.updateTradeType(contractOptions[0].value);
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
        const {
            selectedAsset,
            availableAssets,
            tradingTypeInfo,
            contractOptions,
            payoutInfo,
            ticksInfo,
            proposal } = this.props;
        return (
            <div>
                {false && <MobileChart history={ticksInfo.ticks} />}
                <div className="row">
                    <SelectGroup
                        options={availableAssets}
                        value={selectedAsset}
                        onChange={e => this.updateAssetSelected(e.target.value)}
                    />
                    <FullTradeCategoryPicker
                        onCategoryChange={::this.updateTradeCategory}
                        {...tradingTypeInfo}
                    />
                </div>
                <FullTradeTypePicker
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
                <NumberPlain currency={payoutInfo.currency} value={proposal && proposal.ask_price} digits={2} />
            </div>
        );
    }
}
