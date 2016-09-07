import { takeEvery } from 'redux-saga';
import { select, put } from 'redux-saga/effects';
import changeAmount from '../updates/changeAmount';
import { updateMultipleTradeParams } from '../../_actions';
import { getParams, getProposalId } from './SagaSelectors';
import { api } from '../../_data/LiveData';
import { updatePurchasedContract, updateTradeError } from '../../_actions/TradeActions';
import { updateChartDataByContract } from '../../_actions/ChartDataActions';
import { unsubscribeProposal, subscribeProposal } from './ProposalSubscriptionSaga';

const CHANGE_STAKE = 'CHANGE_STAKE';
const PURCHASE = 'PURCHASE';


export const reqStakeChange = (index, stake) => ({
    type: CHANGE_STAKE,
    index,
    stake,
});

export const reqPurchase = (index, price) => ({
    type: PURCHASE,
    index,
    price,
});

function* handleStakeChange(action) {
    const { index, stake } = action;

    yield put(unsubscribeProposal(index));

    if (+stake <= 0 || stake === '') {
        yield put(updateTradeError(index, 'stakeError', 'Stake must be more than 0'));
        return;
    }

    const params = yield select(getParams(index));
    const updated = changeAmount(stake, params);
    yield [
        put(updateMultipleTradeParams(index, updated)),
        put(subscribeProposal(index, updated)),
    ];
}

function* handlePurchase(action) {
    const { index, price } = action;
    const params = yield select(getParams(index));
    const pid = yield select(getProposalId(index));
    try {
        const { buy } = yield api.buyContract(pid, price);

        const { ticks, candles, symbol, isSold } =
            yield api.getDataForContract(
                () => api.subscribeToOpenContract(buy.contract_id).then(r => r.proposal_open_contract),
                undefined,
                'ticks',
                false
            );

        yield [
            put(updatePurchasedContract(index, buy)),

            // update chart data so that chart will use ticks related to contract only
            put(updateChartDataByContract(buy.contract_id, ticks || candles, 'ticks', symbol, isSold)),
        ];
    } catch (err) {
        if (!err.error || !err.error.error) {
            throw err;                  // rethrow error that we do not expect
        }
        yield put(updateTradeError(index, 'serverError', err.error.error.message));
    } finally {
        yield put(subscribeProposal(index, params));
    }
}

export default function* watchPurchase() {
    yield [
        takeEvery(CHANGE_STAKE, handleStakeChange),
        takeEvery(PURCHASE, handlePurchase),
    ];
}
