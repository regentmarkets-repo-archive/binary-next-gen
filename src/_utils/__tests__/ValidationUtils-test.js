import expect from 'expect';
import { isValidEmail } from '../ValidationUtils.js';

describe('isValidEmail', () => {
    it('returns false for invalid emails', () => {
        const isValid = isValidEmail('not really an email');
        expect(isValid).toEqual(false);
    });

    it('returns true for valid emails', () => {
        const isValid = isValidEmail('email@example.com');
        expect(isValid).toEqual(true);
    });

    it('is not strict', () => {
        const isValid = isValidEmail('a@a.a');
        expect(isValid).toEqual(true);
    });
});
