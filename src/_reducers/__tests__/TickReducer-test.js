import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);

import { fromJS } from 'immutable';
import TickReducer from '../TickReducer';
import { serverDataTickHistory, serverDataTickStream, updateChartDataBySymbol } from '../../_actions';

describe('TickReducer', () => {
    const defaultData = [{ epoch: 100, quote: 0}];
    const initState = fromJS({ x: defaultData });
    describe('should reject data that is older than existing data', () => {

        it('when SERVER_DATA_TICK_STREAM', () => {
            const act = serverDataTickStream({ tick: { symbol: 'x', epoch: 10, quote: 21 }});
            const actual = TickReducer(initState, act);
            expect(actual.get('x').toJS()).to.have.lengthOf(1);
        });
    });

    describe('should ensure result data is sorted', () => {

        it('when SERVER_DATA_TICK_HISTORY', () => {
            const act = serverDataTickHistory({
                echo_req: {
                    ticks_history: 'x',
                },
                history: {
                    times: [10],
                    prices: [21],
                }
            });
            const actual = TickReducer(initState, act);
            const expected = defaultData.concat([{ epoch: 10, quote: 21 }]).sort(x => x.epoch);
            expect(actual.get('x').toJS()).to.deep.equal(expected);
        });

        it('when UPDATE_CHART_DATA_BY_SYMBOL', () => {
            const act = updateChartDataBySymbol('x', [{ epoch: 10, quote: 21 }], 'ticks');
            const actual = TickReducer(initState, act);
            const expected = defaultData.concat([{ epoch: 10, quote: 21 }]).sort(x => x.epoch);
            expect(actual.get('x').toJS()).to.deep.equal(expected);
        });
    });
});
