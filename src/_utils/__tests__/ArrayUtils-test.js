import expect from 'expect';
import { groupByKey,objectToArray } from '../ArrayUtils';

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

});

describe('objectToArray', ()=>{
    const fruitArr = ["Apple","Mango","Orange"];
    const strObj = objectToArray("");
    const obj =  objectToArray(fruitArr);
    it("Get the array length", () =>{
        expect(Object.keys(obj).length).toEqual(3);
    });
    it('get a variable key or index from the array', ()=>{
        expect(obj.indexOf("Mango")).toEqual(1);
    });
    it('its an empty variable or non array conevrtible ', ()=>{
        expect(objectToArray('').length).toEqual(0);
    })
})