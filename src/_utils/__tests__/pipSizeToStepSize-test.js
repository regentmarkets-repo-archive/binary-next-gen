import { expect } from 'chai';
import pipSizeToStepSize from '../pipSizeToStepSize';

describe('pipSizeToStepSize', () => {
    it('should return a number which is the minimum number to represent the pipSize', () => {
        const pipSize = 5;
        expect(pipSizeToStepSize(pipSize)).to.be.equal('0.00001');
    });

    it('should return 0.01 if input is not a number', () => {
        const pipSize = '3w';
        expect(pipSizeToStepSize(pipSize)).to.be.equal('0.01');
    })
});

