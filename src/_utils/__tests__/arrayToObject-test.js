import { expect } from 'chai';
import arrayToObject from '../arrayToObject';

describe('arrayToObject', () => {
    it('should convert arrays of objects into object with arrays of value', () => {
        const arr = [
            {
                text: 'zero',
                value: 0,
            },
            {
                text: 'one',
                value: 1,
            },
            {
                text: 'zero',
                value: 0,
            },
            {
                text: 'one',
                value: 1,
            },
            {
                text: 'two',
                value: 2,
            },
            {
                text: 'two',
                value: 2,
            },
            {
                text: 'three',
                value: 3,
            },
            {
                text: 'four',
                value: 4,
            },
        ];

        const converted = arrayToObject(arr);
        expect(Object.keys(converted).length).to.equal(2);
        expect(converted.text.length).to.equal(8);
        expect(converted.value).to.deep.equal([0, 1, 0, 1, 2, 2, 3, 4]);
    });
});
