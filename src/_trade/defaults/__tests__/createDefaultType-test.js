import createDefaultType from '../createDefaultType';

describe('createDefaultType', () => {
    it('should take 1st type of category', () => {
        const mock = {
            risefall: {
                CALL: {},
                PUT: {},
            },
        };
        const defaultType = createDefaultType(mock, 'risefall');
        expect(defaultType).toEqual('CALL');
    });
});
