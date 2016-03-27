import { expect } from 'chai';
import { fromJS } from 'immutable';
import immutableChildrenToJS from '../immutableChildrenToJS';

describe('immutableChildrenToJS', () => {
    it('should throw when passed undefined', () => {
        expect(() => immutableChildrenToJS()).to.throw();
    });

    it('should return empty object with empty input', () => {
        const obj = {};
        const actual = immutableChildrenToJS(obj);
        expect(obj).to.deep.equal(actual);
    });

    it('should return new object, and not transform the input parameter', () => {
        const obj = {};
        const actual = immutableChildrenToJS(obj);
        expect(obj).to.not.equal(actual);
    });

    it('should return the same object if it has no immutable children', () => {
        const obj = {
            someProp: 'someVal',
            anotherProp: 123,
        };
        const actual = immutableChildrenToJS(obj);
        expect(obj).to.deep.equal(actual);
    });

    it('should transform immutable children of plain object', () => {
        const expected = {
            someObj: {
                someProp: 'someVal',
                anotherProp: 123,
            },
        };
        const immutableObj = {
            someObj: fromJS({
                someProp: 'someVal',
                anotherProp: 123,
            }),
        };
        const actual = immutableChildrenToJS(immutableObj);
        expect(expected).to.deep.equal(actual);
    });
});
