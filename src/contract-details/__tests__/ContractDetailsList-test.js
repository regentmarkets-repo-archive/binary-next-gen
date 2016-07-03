import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ContractDetailsList from '../ContractDetailsList';

describe('ContractDetailsList', () => {
    it('renders correctly when a contract is passed', () => {
        const simplestContract = {
            contract_type: '',
            transaction_ids: {},
        };
        expect(() =>
            shallow(<ContractDetailsList contract={simplestContract} />)
        ).to.not.throw();
    });

    it('Displays a barrier', () => {
        const contractWithBarrier = {
            contract_type: 'CALL',
            barrier: '123',
            transaction_ids: {},
        };
        const wrapper = render(
            <IntlProvider locale="en">
                <ContractDetailsList contract={contractWithBarrier} />
            </IntlProvider>
        );
        expect(wrapper.text()).to.contain('123');
    });

    it('Does not display a barrier if DIGIT barrier', () => {
        const digitContract = {
            contract_type: 'DIGITMATCH',
            barrier: '123',
            transaction_ids: {},
        };
        const wrapper = render(
            <IntlProvider locale="en">
                <ContractDetailsList contract={digitContract} />
            </IntlProvider>
        );
        expect(wrapper.text()).to.not.contain('123');
    });
});
