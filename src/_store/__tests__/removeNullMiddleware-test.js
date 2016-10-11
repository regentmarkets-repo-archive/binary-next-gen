import removeNullMiddleware, { removeNullValueKey } from '../removeNullMiddleware';

describe('nullValueRemover', () => {
    it('should remove null value of shallow object', () => {
        const shallowObj = { a: '1', b: '2', c: null };
        const result = removeNullValueKey(shallowObj);

        expect(result).toEqual({ a: '1', b: '2' });
    });

    it('should remove null value of arbritarily deep object', () => {
        const shallowObj = {
            a: '1',
            b: '2',
            c: null,
            d: {
                e: 's',
                f: {},
                g: null,
            },
        };
        const result = removeNullValueKey(shallowObj);

        expect(result).toEqual(
            {
                a: '1',
                b: '2',
                d: {
                    e: 's',
                    f: {},
                },
            },
        );
    });
});

describe('removeNullMiddleware', () => {
    const fakeStore = {};           // empty since not used
    const middleware = removeNullMiddleware(fakeStore);
    it('should return a function', () => {
        expect(typeof middleware).toEqual('function');
    });

    it('should remove null value in action', () => {
        const action = {
            type: 'TEST_ACTION',
            payload: {
                empty: null,
                notempty: 999,
            },
            empty: null,
        };

        const nextDoNothing = act => act;
        const resultAction = middleware(nextDoNothing)(action);

        expect(resultAction).toEqual({
            type: 'TEST_ACTION',
            payload: {
                notempty: 999,
            },
        });
    });
});
