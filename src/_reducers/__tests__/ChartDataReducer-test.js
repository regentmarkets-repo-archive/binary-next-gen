import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import chartDataReducer from '../ChartDataReducer';
import { UPDATE_CHART_DATA_BY_CONTRACT, SERVER_DATA_PROPOSAL_OPEN_CONTRACT } from '../../_constants/ActionTypes';
import { updateChartDataByContract, serverDataOHLCStream, serverDataProposalOpenContract } from '../../_actions/';

describe('Chart data reducer', () => {
    it('should store data when received UPDATE_CHART_DATA_BY_CONTRACT action', () => {
        const actual = chartDataReducer(undefined, {
            type: UPDATE_CHART_DATA_BY_CONTRACT,
            contractID: '1',
            data: [1, 2, 3, 4],
            dataType: 'ticks',
        });
        expect(actual.getIn(['1', 'ticks']).toJS()).to.deep.equal([1, 2, 3, 4]);
    });

    it('should store data when according to dataType', () => {
        const actual = chartDataReducer(undefined, {
            type: UPDATE_CHART_DATA_BY_CONTRACT,
            contractID: '1',
            data: [1, 2, 3, 4],
            dataType: 'candles',
        });

        expect(actual.getIn(['1', 'candles']).toJS()).to.deep.equal([1, 2, 3, 4]);
    });

    // TODO: this behaviour is pretty implicit, might worth to rethink
    it('should update data when received stream of open contract', () => {
        const initial = fromJS({}).setIn(['1001', 'ticks'], fromJS([{ epoch: 1, quote: 1 }]));

        const actual = chartDataReducer(initial, {
            type: SERVER_DATA_PROPOSAL_OPEN_CONTRACT,
            serverResponse: {
                proposal_open_contract: {
                    contract_type: 'CALL',
                    contract_id: '1001',
                    current_spot: 2,
                    current_spot_time: 2,
                },
            },
        });

        expect(actual.getIn(['1001', 'ticks']).toJS()).to.have.lengthOf(2);
    });

    describe('should only store sorted data', () => {
        const initState = fromJS({ 101: {
            ticks: [{ epoch: 100 }],
            candles: [{ epoch: 100 }],
            isSold: true,
            symbol: 'x',
        }});

        describe('when UPDATE_CHART_DATA_BY_CONTRACT', () => {
            it('for Tick data', () => {
                const act = updateChartDataByContract('101', [{ epoch: 99 }], 'ticks', 'x', true);
                const actual = chartDataReducer(initState, act);
                expect(actual.get('101').toJS().ticks).to.deep.equal([{ epoch: 99 }, { epoch: 100 }]);
            });

            it('for OHLC data', () => {
                const act = updateChartDataByContract('101', [{ epoch: 99 }], 'candles', 'x', true);
                const actual = chartDataReducer(initState, act);
                expect(actual.get('101').toJS().candles)
                    .to.deep.equal([
                        { epoch: 99 },
                        { epoch: 100 }
                    ]);
            });
        });

        it('when SERVER_DATA_OHLC_STREAM', () => {
            const act = serverDataOHLCStream({ ohlc: {
                symbol: 'x',
                epoch: 99,
            }});
            const actual = chartDataReducer(initState, act);
            expect(actual.get('101').toJS().candles).to.deep.equal([{ epoch: 100 }]);
        });

        it('when SERVER_DATA_PROPOSAL_OPEN_CONTRACT', () => {
            const act = serverDataProposalOpenContract({
                proposal_open_contract: {
                    contract_id: 101,
                    sell_time: 1001,
                    current_spot: 9,
                    current_spot_time: 99,
                }
            });

            const actual = chartDataReducer(initState, act);

            expect(actual.get('101').toJS().ticks).to.deep.equal([{ epoch: 100 }]);
        });
    });
});
