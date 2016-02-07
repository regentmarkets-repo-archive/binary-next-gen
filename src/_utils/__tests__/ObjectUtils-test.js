import expect from 'expect';
import { fromJS } from 'immutable';
import { findIfExist, toPlainJS, immutableChildrenToJS } from '../ObjectUtils';

describe('findIfExist', () => {
    it('find if any values in object meet a predicate, recursively', () => {
        const testObj = {
            a: {
                b: {
                    c: 6,
                    d: 3,
                },
                e: [1, 3, 5],
            },
            f: {
                g: 'halo',
            },
        };

        const predicate1 = o => o === 'halo';
        const predicate2 = o => Array.isArray(o) && o.indexOf(1) === 0;

        const result1 = findIfExist(testObj, predicate1);
        const result2 = findIfExist(testObj, predicate2);

        expect(result1).toEqual(true);
        expect(result2).toEqual(true);
    });
});

describe('toPlainJS', () => {
    it('should not throw when passed undefined', () => {
        expect(() => toPlainJS()).toNotThrow();
    });

    it('should return the same object if it is not immutable', () => {
        const obj = {};
        const actual = toPlainJS(obj);
        expect(obj).toBe(actual);
    });

    it('should return equivalent object if it is immutable', () => {
        const obj = {
            someProp: 'someVal',
            anotherProp: 123,
        };
        const immutableObj = fromJS(obj);
        const actual = toPlainJS(immutableObj);
        expect(obj).toEqual(actual);
    });

    it('should not transform immutable children of plain object', () => {
        const obj = {
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
        const actual = toPlainJS(immutableObj);
        expect(obj).toNotEqual(actual);
    });
});

describe('immutableChildrenToJS', () => {
    it('should throw when passed undefined', () => {
        expect(() => immutableChildrenToJS()).toThrow();
    });

    it('should return empty object with empty input', () => {
        const obj = {};
        const actual = immutableChildrenToJS(obj);
        expect(obj).toEqual(actual);
    });

    it('should return new object, and not transform the input parameter', () => {
        const obj = {};
        const actual = immutableChildrenToJS(obj);
        expect(obj).toNotBe(actual);
    });

    it('should return the same object if it has no immutable children', () => {
        const obj = {
            someProp: 'someVal',
            anotherProp: 123,
        };
        const actual = immutableChildrenToJS(obj);
        expect(obj).toEqual(actual);
    });

    it('should transform immutable children of plain object', () => {
        const obj = {
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
        expect(obj).toEqual(actual);
    });
});
