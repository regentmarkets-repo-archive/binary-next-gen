import { fromJS } from 'immutable';
import {
    updateActiveLayout,
    closeContractReceipt,
    updatePurchasedContract,
} from '../../_actions';
import * as types from '../../_constants/ActionTypes';
import reducer from '../trades/TradesPurchaseInfoReducer';

describe('PurchaseInfoReducer', () => {
    const defaultPurchaseInfo = {};
    const initialState = fromJS([defaultPurchaseInfo]);

    it('should remove if existing trade is more than active layout when CHANGE_ACTIVE_LAYOUT received', () => {
        const action = updateActiveLayout(3, 1);
        const actual = reducer(initialState, action);
        expect(actual.toJS().length).toEqual(3);
    });

    it('should remove purchase info when CLOSE_CONTRACT_RECEPIT received', () => {
        const action = closeContractReceipt(0);
        const actual = reducer(fromJS[{
            mostRecentContractId: 1234556,
            lastBoughtContract: {},
        }], action);

        expect(actual.toJS()[0]).to.be.empty;
    });

    it('should update purchase info when PURCHASED_CONTRACT received', () => {
        const receipt = { contract_id: 10101 };
        const action = updatePurchasedContract(0, receipt);
        const actual = reducer(initialState, action);
        expect(actual.toJS()[0]).to.have.keys(['receipt', 'mostRecentContractId']);
    });

    it('should remove specified object when REMOVE_TRADE received', () => {
        const action = { type: types.REMOVE_TRADE, index: 1 };
        const actual = reducer(fromJS([defaultPurchaseInfo, defaultPurchaseInfo]), action);
        expect(actual.toJS().length).toEqual(1);
    });
});
