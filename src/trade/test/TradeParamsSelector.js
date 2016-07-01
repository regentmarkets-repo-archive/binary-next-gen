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

const contractPerTrade = createSelector(
    [availableContractsSelector, paramPerTrade],
    (contracts, param) => {
        const symbol = param.get('symbol');
        return contracts.get(symbol);
    }
);

const marketIsOpenPerTrade = createSelector(
    [assetsIsOpenSelector, paramPerTrade],
    (assetsIsOpen, param) => {
        const symbol = param.get('symbol');
        return assetsIsOpen[symbol].isOpen;
    }
);

const errorPerTrade = (state, props) => tradesErrorSelector(state).get(props.index);
const proposalPerTrade = (state, props) => tradeProposalInfoSelector(state).get(props.index);
const uiStatePerTrade = (state, props) => tradesUIStatesSelector(state).get(props.index);
const purchasePerTrade = (state, props) => tradePurchaseInfoSelector(state).get(props.index);

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

export const tradeParamsPerTrade = createSelector(
    [
        currencySelector,
        contractPerTrade,
        paramPerTrade,
        errorPerTrade,
        pipSizePerTrade,
        purchasePerTrade,
        proposalPerTrade,
        uiStatePerTrade,
        marketIsOpenPerTrade,
        (state, props) => props.index,
    ],
    (currency, contract, params, errors, pipSize, purchaseInfo, proposalInfo, uiState, marketIsOpen, index) => {
        let contractToUse = contract;
        if (!contract) {
            contractToUse = mockedContract;
        } else if (!marketIsOpen) {
            contractToUse = getStartLaterOnlyContract(contract);
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

export const singleTradeSelector = () => createStructuredSelector({
    chartProps: tradeViewChartPerTrade,
    paramsProps: tradeParamsPerTrade,
});
