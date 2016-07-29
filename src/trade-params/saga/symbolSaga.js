const CREATE_TRADE = 'CREATE_TRADE';
export const createTrade = (index, symbol) => ({
    type: CREATE_TRADE,
    index,
    symbol,
});

const CHANGE_SYMBOL = 'CHANGE_SYMBOL';
export const reqSymbolChange = (index, symbol) => ({
    type: CHANGE_SYMBOL,
    index,
    symbol,
});


function* tradeCreation(action) {
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

        const subscription = yield api.subscribeToPriceForContractProposal(subscribeParams);
        yield put(updateTradeProposal(index, 'proposal', subscription.proposal));
    } else {
        try {
            const { contracts_for } = yield call(api.getContractsForSymbol, symbol);

            yield put(updateFeedLicense(symbol, contracts_for.feed_license));
            yield put(updateTradingOptions(symbol, contracts_for.available));
            yield put(createTrade(index, symbol));
        } catch (err) {
            console.log('error ', err);
            yield (updateTradingOptionsErr(symbol, err));
        }
    }
}

