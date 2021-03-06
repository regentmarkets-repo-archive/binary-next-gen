import { put, select, takeEvery, all } from 'redux-saga/effects';
import validate from 'validate.js/validate.min';
import moment from 'moment';
import { getProposalId } from './SagaSelectors';
import { api } from '../../_data/LiveData';
import { updateTradeProposal, updateTradeError } from '../../_actions';
import { currencySelector, defaultCurrencySelector } from '../../_store/directSelectors';
import { internalTradeModelToProposalModel } from '../../trade/adapters/TradeObjectAdapter';
import { clearTradeError } from '../../_actions/TradeActions';

const UNSUBSCRIBE_PROPOSAL = 'UNSUBSCRIBE_PROPOSAL';
export const unsubscribeProposal = index => ({
    type: UNSUBSCRIBE_PROPOSAL,
    index,
});

function* handleUnsubscribe(action) {
    const { index } = action;
    const oldProposalId = yield select(getProposalId(index));
    yield put(clearTradeError(index));
    if (oldProposalId) {
        yield all([
            api.unsubscribeByID(oldProposalId),
            put(updateTradeProposal(index, 'proposal', {})),
        ]);
    }
}

const SUBSCRIBE_PROPOSAL = 'SUBSCRIBE_PROPOSAL';
export const subscribeProposal = (index, params) => ({
    type: SUBSCRIBE_PROPOSAL,
    index,
    params,
});

function* getCurrency() {
    const userCurrency = yield select(currencySelector);
    const defaultCurrency = yield select(defaultCurrencySelector);
    return userCurrency || defaultCurrency;
}

function* handleSubscription(action) {
    const { index, params } = action;
    const p = { ...params }; // copy params since we may mutate it
    const currency = yield getCurrency();

    if (p.dateStart) {
        // convert the time to GMT time before sending to server
        const timezoneOffsetSeconds = new Date().getTimezoneOffset() * 60;
        p.dateStart -= timezoneOffsetSeconds;

        // Server side error message is unfriendly, so we verify from frontend to
        // display a more pleasing error message:
        const dateStr = moment.unix(params.dateStart).format('YYYY-MM-DD');
        const errors = validate.single(dateStr, {
            date: {
                // unix epoch only starts from 1970
                earliest: moment('1970-01-01'),
                latest: moment().add(270, 'years')
            }
        });

        if (errors) {
            yield put(updateTradeError(index, 'durationError', 'Please enter a valid start date.'));
            return;
        }
    }
    const paramForSubscription = internalTradeModelToProposalModel(p, p.symbol, currency);
    try {
        const { proposal } = yield api.subscribeToPriceForContractProposal(paramForSubscription);
        yield put(updateTradeProposal(index, 'proposal', proposal));
    } catch (err) {
        yield put(updateTradeError(index, 'serverError', err.error.error.message));
    }
}

export default function* watchProposalSubscription() {
    yield all([
        takeEvery(UNSUBSCRIBE_PROPOSAL, handleUnsubscribe),
        takeEvery(SUBSCRIBE_PROPOSAL, handleSubscription),
    ]);
}
