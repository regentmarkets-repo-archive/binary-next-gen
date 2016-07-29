import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { updateMultipleTradeParams, updateTradingOptions, updateTradeUIState, updateTradeError,
    updateFeedLicense, updateTradingOptionsErr, updateTradeProposal } from '../../_actions';
import { api } from '../../_data/LiveData';
import * as paramUpdate from '../TradeParamsCascadingUpdates';
import { getProposalId, getForceRenderCount, existingParams, contractOfSymbol } from './SagaSelectors';
import { internalTradeModelToProposalModel } from '../../trade/adapters/TradeObjectAdapter';
import { currencySelector } from '../../_store/directSelectors';
import { createTrade } from './TradeParamSaga';

const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
export const reqSymbolChange = (index, symbol) => ({
    type: CHANGE_SYMBOL,
    index,
    symbol,
});

export function* tradeCreation(action) {
    const { index, symbol } = action;

    // unsubscribe and remove existing proposal
    const oldProposalId = yield select(getProposalId(index));
    if (oldProposalId) {
        yield [
            api.unsubscribeByID(oldProposalId),
            put(updateTradeProposal(index, 'proposal')),
        ];
    }

    const contractNeeded = yield select(contractOfSymbol(symbol));
    if (contractNeeded) {
        const [params, currency] = yield [
            select(existingParams(index)),
            select(currencySelector),
        ];

        const updatedParams = paramUpdate.changeSymbol(symbol, contractNeeded, params);
        const subscribeParams = internalTradeModelToProposalModel(updatedParams, symbol, currency);
        yield put(updateMultipleTradeParams(index, updatedParams));

        const renderCount = yield select(getForceRenderCount(index));
        yield put(updateTradeUIState(index, 'forceRenderCount', renderCount + 1));

        try {
            const { proposal } = yield api.subscribeToPriceForContractProposal(subscribeParams);
            yield put(updateTradeProposal(index, 'proposal', proposal));
        } catch (err) {
            yield put(updateTradeError(index, 'proposalError', err.message));
        }
    } else {
        try {
            const { contracts_for } = yield api.getContractsForSymbol(symbol);

            yield put(updateFeedLicense(symbol, contracts_for.feed_license));
            yield put(updateTradingOptions(symbol, contracts_for.available));
            yield put(createTrade(index, symbol));
        } catch (err) {
            yield (updateTradingOptionsErr(symbol, err));
        }
    }
}

export default function* watchSymbol() {
    yield takeLatest(CHANGE_SYMBOL, tradeCreation);
}
