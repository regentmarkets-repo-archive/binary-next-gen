import React from 'react';
import { expect } from 'chai';
import TradesContainer from '../TradesContainer';

describe('TradesContainer', () => {
    it('should render with no properties', () => {
        expect(<TradesContainer />).to.not.throw;
    });
});
