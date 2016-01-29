import expect from 'expect';
import { dateToDateString, epochToDateString,secondsToTimeString,getLastXMonthEpoch,dateToEpoch,epochToDate, timeStringSmaller, timeStringBigger} from '../DateUtils.js';

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
});
describe('secondsToTimeString', () => {
    it('convert seconds to minutes',() =>{
        const seconds = 60 ;
        expect(secondsToTimeString(seconds)).toEqual('1 minute(s)');
    });
    it('convert seconds to Days,hour, minute and second', ()=>{
        expect(secondsToTimeString(90177)).toEqual('1 day(s) 1 hour(s)2 minute(s)57 second(s)');
    });

});

describe('getLastXMonthEpoch', () => {
    it('Set the x months from the current date and convert time in epoch', ()=>{
        const currTimeEpoch = (new Date()).getTime()/1000;
        expect(getLastXMonthEpoch(0)).toEqual(Math.floor(currTimeEpoch));
    });
});

describe('epochToDate', () =>{
    it('convert epoch format to date', () =>{
        const epochTime = (new Date())/1000;
        expect(epochToDate(new Date()/1000)).toEqual(new Date());
    });
});

describe('dateToEpoch', () => {
    it('convert date to epoch equivalent', ()=>{
        expect(dateToEpoch(new Date())).toEqual(Math.floor(new Date()/1000));
    });
});

describe('timeStringSmaller', () => {
    it('Comapare two time strings and determine if the first is smaller', ()=>{
        expect(timeStringSmaller('010203','020203')).toEqual(true);
    });

    it('Comapare two and determine the two times are thesame', ()=>{
        expect(timeStringSmaller('010203','010203')).toEqual(false);
    });
});

describe('timeStringBigger',()=>{
    it('compare two time string and determine the first is bigger', ()=>{
        expect(timeStringBigger('010203','010103')).toEqual(true);
    });

    it('when the first string time is bigger by seconds',()=>{
        expect(timeStringBigger('010203','010201')).toEqual(true);
    });

    it('compare two time strings and determine the second is bigger', ()=>{
        expect(timeStringBigger('010203','010204')).toEqual(false);
    });
});