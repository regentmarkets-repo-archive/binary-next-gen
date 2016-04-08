import { expect } from 'chai';
import errorToString from '../errorToString';

describe('errorToString', () => {
    it('should strip the error code from the error message', () => {
        const msg = 'Server Error : error code (303) user not found';
        expect(errorToString(msg)).to.equal(' user not found');
    });
});
