import { fromJS } from 'immutable';
import { expect } from 'chai';
import { contractToShow, dataToShow, pipSizeSelector } from '../ContractDetailsSelectors';

describe('ContractDetailsSelectors', () => {
    describe('contractToShow', () => {
        it('should return contract determined by contractShown value', () => {
            const state = {
                portfolio: fromJS({
                    contractShown: 1,
                }),
                boughtContracts: fromJS({
                    1: {
                        contract_id: 1,
                        test: 0,
                    },
                }),
            };

            const actual = contractToShow(state);
            expect(actual.toJS()).to.be.deep.equal({ contract_id: 1, test: 0 });
        });
    });

    describe('dataToShow', () => {
        it('should return data determined by contractShown value', () => {
            const state = {
                portfolio: fromJS({
                    contractShown: 'xxx',
                }),
                chartData: fromJS({
                    xxx: {
                        contract_id: 1,
                        test: 0,
                    },
                }),
            };

            const actual = dataToShow(state);
            expect(actual.toJS()).to.be.deep.equal({ contract_id: 1, test: 0 });
        })
    });
});
