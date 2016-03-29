import { expect } from 'chai';
import isValidEmail from '../isValidEmail';

describe('isValidEmail', () => {
    it('returns false for invalid emails', () => {
        const isValid = isValidEmail('not really an email');
        expect(isValid).to.be.false;
    });

    it('returns true for valid emails', () => {
        const isValid = isValidEmail('email@example.com');
        expect(isValid).to.be.true;
    });

    it('is not strict', () => {
        const isValid = isValidEmail('a@a.a');
        expect(isValid).to.be.true;
    });
});
