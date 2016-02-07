import expect from 'expect';
import { dateToDateString, epochToDateString, timeStringIsBetween } from '../DateUtils';

describe('dateToDateString', () => {
    it('converts first day of the year', () => {
        const str = dateToDateString(new Date(2000, 0, 1));
        expect(str).toEqual('2000-01-01');
    });
    it('converts last day of the year', () => {
        const str = dateToDateString(new Date(1999, 11, 31));
        expect(str).toEqual('1999-12-31');
    });
});

describe('epochToDateString', () => {
    it('convert to string correctly', () => {
        const str = epochToDateString(1000000000);
        expect(str).toEqual('2001-09-09');
    });
    it('returns undefined on undefined', () => {
        const str = epochToDateString();
        expect(str).toNotExist();
    });
});

describe('timeStringIsBetween', () => {
    it('should return true if target string is between start and end time string', () => {
        const target = '09:00:22';
        const start = '08:00:00';
        const end = '10:10:00';
        expect(timeStringIsBetween(start, end, target)).toEqual(true);
    });

    it('should return false if target string is outside of start and end time string', () => {
        const target = '07:00:22';
        const start = '08:00:00';
        const end = '10:10:00';
        expect(timeStringIsBetween(start, end, target)).toEqual(false);
    });

    it('should return true if start time is larger than end time, and target time is within range', () => {
        const target = '12:00:22';
        const start = '10:10:00';
        const end = '08:00:00';

        expect(timeStringIsBetween(start, end, target)).toEqual(true);
    });

    it('should return false if start time is larger than end time, and target time is out of range', () => {
        const target = '09:00:22';
        const start = '10:10:00';
        const end = '08:00:00';

        expect(timeStringIsBetween(start, end, target)).toEqual(false);
    });
});
