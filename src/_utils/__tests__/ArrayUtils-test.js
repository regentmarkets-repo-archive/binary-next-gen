import expect from 'expect';
import { groupByKey, arrayToObject } from '../ArrayUtils';

describe('ArrayUtils', () => {
    it('group elements in array by key specified', () => {
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

        const grouped = groupByKey(arr, 'value');
        expect(Object.keys(grouped).length).toEqual(5);
    });

    it("s array is of length 3", () =>{
        const fruitArr = ["Apple","Mango","Orange"];
        const obj =  objectToArray(fruitArr);
        expect(Object.keys(obj).length).toEqual(3);
    });

    it("s second array object's key is 1", ()=>{
        const fruitArr = ["Apple","Mango","Orange"];
        const obj =  objectToArray(fruitArr);
        expect(obj.indexOf("Mango")).toEqual(1);
    });

    it('s an empty variable or non array convertible', ()=>{
        const fruitArr = ["Apple","Mango","Orange"];
        const obj =  objectToArray(fruitArr);
        expect(objectToArray('').length).toEqual(0);
    });

});

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
        expect(Object.keys(converted).length).toEqual(2);
        expect(converted.text.length).toEqual(8);
        expect(converted.value).toEqual([0, 1, 0, 1, 2, 2, 3, 4]);
    });
});
