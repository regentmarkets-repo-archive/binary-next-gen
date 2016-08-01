import { expect } from 'chai';
import BarrierSaga, { reqBarrierChange } from '../BarrierSaga';

describe("BarrierSaga", () => {
    it('should try unsubscribe proposal as the first thing', () => {
        const act = reqBarrierChange(0, [0.11]);
        const gen = BarrierSaga(act);

        expect(gen.next().value).to.deep.equal({});
    });
})