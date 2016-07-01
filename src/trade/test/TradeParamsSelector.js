import {
    currencySelector,
    tradeProposalInfoSelector,
    tradePurchaseInfoSelector,
    tradesErrorSelector,
    tradesUIStatesSelector,
} from '../../_store/directSelectors';
import { createSelector, createStructuredSelector } from 'reselect';
import findDeep from 'binary-utils/lib/findDeep';
import filterObjectBy from 'binary-utils/lib/filterObjectBy';
import { assetsIsOpenSelector, availableContractsSelector } from '../TradeSelectors';
import { paramPerTrade, pipSizePerTrade, tradeViewChartPerTrade } from './TradeViewChartSelector';
import { mockedContract } from '../../_constants/MockContract';

const contractPerTrade = index => createSelector(
    [availableContractsSelector, paramPerTrade(index)],
    (contracts, param) => {
        const symbol = param.get('symbol');
        return contracts.get(symbol);
    }
);

const marketIsOpenPerTrade = index => createSelector(
    [assetsIsOpenSelector, paramPerTrade(index)],
    (assetsIsOpen, param) => {
        const symbol = param.get('symbol');
        return assetsIsOpen[symbol].isOpen;
    }
);

const errorPerTrade = index => state => tradesErrorSelector(state).get(index);
const proposalPerTrade = index => state => tradeProposalInfoSelector(state).get(index);
const uiStatePerTrade = index => state => tradesUIStatesSelector(state).get(index);
const purchasePerTrade = index => state => tradePurchaseInfoSelector(state).get(index);

const getStartLaterOnlyContract = contract => {
    const startLaterCategories =
        filterObjectBy(contract, child =>
            findDeep(child, descendent => descendent && !!descendent.forwardStartingDuration));

    Object.keys(startLaterCategories).forEach(category => {
        Object.keys(startLaterCategories[category]).forEach(type => {
            if (startLaterCategories[category][type].durations) {
                delete startLaterCategories[category][type].durations;
            }
        });
    });

    return startLaterCategories;
};

export const tradeParamsPerTrade = index => createSelector(
    [
        currencySelector,
        contractPerTrade(index),
        paramPerTrade(index),
        errorPerTrade(index),
        pipSizePerTrade(index),
        purchasePerTrade(index),
        proposalPerTrade(index),
        uiStatePerTrade(index),
        marketIsOpenPerTrade(index),
    ],
    (currency, contract, params, errors, pipSize, purchaseInfo, proposalInfo, uiState, marketIsOpen) => {
        let contractToUse = contract;
        if (!contract) {
            contractToUse = mockedContract;
        } else if (!marketIsOpen) {
            contractToUse = getStartLaterOnlyContract(contract.toJS());
        }

        const disabled = !contract || contractToUse.error || uiState.get('disabled');
        return {
            currency,
            contract: contractToUse,
            disabled,
            errors,
            index,
            pipSize,
            proposal: proposalInfo.get('proposal'),
            tradeParams: params,
        };
    }
);

export const singleTradeSelector = index => createStructuredSelector({
    chartProps: tradeViewChartPerTrade(index),
    paramsProps: tradeParamsPerTrade(index),
});

export const mobileTradeSelector = singleTradeSelector(0);
