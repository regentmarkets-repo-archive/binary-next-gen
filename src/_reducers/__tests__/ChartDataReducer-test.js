import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import ChartDataReducer from '../ChartDataReducer';
import { UPDATE_CHART_DATA_BY_CONTRACT, SERVER_DATA_PROPOSAL_OPEN_CONTRACT } from '../../_constants/ActionTypes'

describe('Chart data reducer', () => {
    it('should store data when received UPDATE_CHART_DATA_BY_CONTRACT action', () => {
        const actual = ChartDataReducer(undefined,{
            type: UPDATE_CHART_DATA_BY_CONTRACT,
            contractID: '1',
            data: [1,2,3,4]
        });

        expect(actual.get('1')).to.deep.equal([1,2,3,4]);
    });

    // TODO: this behaviour is pretty implicit, might worth to rethink
    it('should update data when received stream of open contract', () => {
        const initial = fromJS({}).set('1001', [{ epoch: 1, quote: 1 }]);

        const actual = ChartDataReducer(initial, {
            type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
            serverResponse: {
                proposal_open_contract: {
                    contract_id: '1001',
                    current_spot: 2,
                    current_spot_time: 2,
                },
            },
        });

        expect(actual.get('1001')).to.have.lengthOf(2);
    })
});
