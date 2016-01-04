import expect from 'expect';
import { dateToDateString, epochToDateString } from '../DateUtils.js';

describe('dateToDateString', () => {
    it('converts first day of the year', () => {
        const str = dateToDateString(new Date(2000, 0, 1));
        expect(str).toEqual('2000-01-01');
    });
    it('converts last day of the year', () => {
        const str = dateToDateString(new Date(1999, 11, 31));
        expect(str).toEqual('2000-12-31');
    });
});

describe('epochToDateString', () => {
    it('convert to string correctly', () => {
        const str = epochToDateString(1000000000);
        expect(str).toEqual('2001-09-09');
    });
});
