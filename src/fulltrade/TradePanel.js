import React, { Component, PropTypes } from 'react';
import { SelectGroup, RadioGroup, ErrorMsg } from '../_common';
import { contractCategoryDisplay } from '../_utils/TradeUtils';
import DurationCard from './DurationCard';
import BarrierCard from './BarrierCard';
import PayoutCard from './PayoutCard';
import ContractStatsCard from './ContractStatsCard';

export default class TradePanel extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,
        contract: PropTypes.object,
        id: PropTypes.string.isRequired,
        trade: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { actions, id } = this.props;
        actions.updatePriceProposalSubscription(id);
    }

    componentWillReceiveProps(nextProps) {
        // asset changed, update category
        const newSymbol = nextProps.trade.symbol;
        const oldSymbol = this.props.trade.symbol;
        if (newSymbol !== oldSymbol) {
            this.updateHelper('tradeCategory', 'callput');
        }

        // category change, update type
        const newCategory = nextProps.trade.tradeCategory;
        const oldCategory = this.props.trade.tradeCategory;
        if (newCategory !== oldCategory) {
            const newType = Object.keys(nextProps.contract[newCategory])[0];
            this.updateHelper('type', newType);
        }

        // type change, update unit
        const newType = nextProps.trade.type;
        const oldType = this.props.trade.type;
        if (newType !== oldType) {
            const newUnit = nextProps.contract[newCategory][newType].durations[0].unit;
            this.updateHelper('durationUnit', newUnit);
        }
    }

    updateHelper(name, value, update = true) {
        const { actions, id } = this.props;
        actions.updateTradeParams(id, name, value);
        if (update) {
            actions.updatePriceProposalSubscription(id);
        }
    }

    onAssetChange(e) {
        this.updateHelper('symbol', e.target.value);
    }

    onCategoryChange(e) {
        this.updateHelper('tradeCategory', e.target.value);
        const { contract } = this.props;
        const defaultType = Object.keys(contract[e.target.value])[0];
        const newBarriers = contract[e.target.value][defaultType].barriers;
        if (!newBarriers) {
            this.updateHelper('barrier', undefined, false);
            this.updateHelper('barrier2', undefined, false);
        } else if (newBarriers.length === 1) {
            this.updateHelper('barrier', newBarriers[0].value, false);
            this.updateHelper('barrier2', undefined, false);
        } else if (newBarriers.length === 2) {
            this.updateHelper('barrier', newBarriers[0].value, false);
            this.updateHelper('barrier2', newBarriers[1].value, false);
        }
    }

    onTypeChange(e) {
        this.updateHelper('type', e.target.value);
    }

    onDurationChange(e) {
        this.updateHelper('duration', e.target.value);
    }

    onDurationUnitChange(e) {
        this.updateHelper('durationUnit', e.target.value);
    }

    onBarrier1Change(e) {
        this.updateHelper('barrier', e.target.value);
    }

    onBarrier2Change(e) {
        this.updateHelper('barrier2', e.target.value);
    }

    onBasisChange(e) {
        this.updateHelper('basis', e.target.value);
    }

    onAmountChange(e) {
        this.updateHelper('amount', e.target.value);
    }

    onPurchase() {
        console.log('purchase');
    }

    render() {
        const { assets, contract, trade } = this.props;
        const selectedSymbol = trade.symbol;
        const categories = Object.keys(contract).map(c => ({ value: c, text: contractCategoryDisplay(c) }));
        const selectedCategory = trade.tradeCategory;
        const types = Object.keys(contract[selectedCategory]).map(type => ({ text: type, value: type }));
        const selectedType = trade.type;
        const contractForType = contract[selectedCategory][selectedType];
        const barriers = contractForType && contractForType.barriers;
        return (
            <div>
                <div className="row">
                    <SelectGroup
                        options={assets}
                        value={selectedSymbol}
                        onChange={::this.onAssetChange}
                    />
                    <SelectGroup
                        options={categories}
                        value={selectedCategory}
                        onChange={::this.onCategoryChange}
                    />
                </div>
                { contractForType &&
                    <div>
                        <RadioGroup
                            name="trading-types"
                            options={types}
                            value={selectedType}
                            onChange={::this.onTypeChange}
                        />
                        <DurationCard
                            duration={trade.duration}
                            durationUnit={trade.durationUnit}
                            options={contractForType.durations}
                            onDurationChange={::this.onDurationChange}
                            onUnitChange={::this.onDurationUnitChange}
                        />
                        <BarrierCard
                            barrier={trade.barrier}
                            barrier2={trade.barrier2}
                            barrier1Info={barriers && barriers[0]}
                            barrier2Info={barriers && barriers[1]}
                            onBarrier1Change={::this.onBarrier1Change}
                            onBarrier2Change={::this.onBarrier2Change}
                            spot={trade.proposal && +trade.proposal.spot}
                        />
                    </div>
                }
                <PayoutCard
                    basis={trade.basis}
                    amount={+trade.amount}
                    currency="USD"
                    onAmountChange={::this.onAmountChange}
                    onBasisChange={::this.onBasisChange}
                />
                {trade.proposal && <ContractStatsCard proposal={trade.proposal} />}
                <ErrorMsg shown={!!trade.proposalError} text={trade.proposalError && trade.proposalError.message} />
                <button onClick={::this.onPurchase}>Purchase</button>
            </div>
        );
    }
}
