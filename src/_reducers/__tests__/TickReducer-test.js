import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import { fromJS } from 'immutable';
import tickReducer from '../TickReducer';
import { SERVER_DATA_TICK_STREAM } from '../../_constants/ActionTypes';
import { serverDataTickHistory, serverDataTickStream } from '../../_actions';

chai.use(chaiImmutable);

describe('TickReducer', () => {
    const defaultData = [{ epoch: 100, quote: 0 }];
    const initState = fromJS({ x: defaultData });
    describe('should reject data that is older than existing data', () => {
        it('when SERVER_DATA_TICK_STREAM', () => {
            const act = serverDataTickStream({ tick: { symbol: 'x', epoch: 10, quote: 21 } });
            const actual = tickReducer(initState, act);
            expect(actual.get('x').toJS()).to.have.lengthOf(1);
        });
    });
    describe('should not throw', () => {
        it('when symbol does not exist, is empty or undefined', () => {
            const action = {
                serverResponse: {
                     tick: { symbol: 'x', epoch: 10, quote: 21 },
                },
                type: SERVER_DATA_TICK_STREAM,
            };
            expect(tickReducer(initState, action)).to.not.throw;
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
                },
            });
            const actual = tickReducer(initState, act);
            const expected = defaultData.concat([{ epoch: 10, quote: 21 }]).sort(x => x.epoch);
            expect(actual.get('x').toJS()).to.deep.equal(expected);
        });
    });
});
