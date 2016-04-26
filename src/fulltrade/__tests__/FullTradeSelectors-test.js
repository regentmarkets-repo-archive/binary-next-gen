import { fromJS, Map } from 'immutable';
import { expect } from 'chai';
import * as FullTradeSelectors from '../FullTradeSelectors';
import assetsFromServer from 'binary-utils/test-data/assets';
import contractsForR50 from 'binary-utils/test-data/contractsForR50';
import contractsForGDAXI from 'binary-utils/test-data/contractsForGDAXI';

describe('assetsIsOpenSelector', () => {
    const assetsIsOpen = FullTradeSelectors.assetsIsOpenSelector({ assets: fromJS(assetsFromServer) });

    it('should create a tree with isOpen as key of each children', () => {
        for (let symbol in assetsIsOpen) {
            expect(assetsIsOpen[symbol].isOpen).to.not.be.undefined;
        }
    });

    it('should create a tree with isOpen correctly set based on input', () => {
        expect(assetsIsOpen.frxAUDJPY.isOpen).to.be.true;
    });

    it('should return all symbol passed in', () => {
        const inputLen = assetsFromServer.length;
        const outputLen = Object.keys(assetsIsOpen).length;
        expect(inputLen).to.be.equal(outputLen);
    });
});

describe('availableContractsSelector', () => {
    const availableContracts = FullTradeSelectors.availableContractsSelector({
        assets: fromJS(assetsFromServer),
        tradingOptions: new Map({ R_50: contractsForR50, GDAXI: contractsForGDAXI }),
    });

    it('should return contract if symbol is opened', () => {
        expect(availableContracts.get('R_50')).to.be.ok;
    });

    it('should return contract if symbol is closed, but offer startLater options', () => {
        expect(availableContracts.get('GDAXI')).to.be.ok;
    });

    it('should not return contract if symbol is closed, and does not offered startLater options', () => {
        const gdaxiContracts = availableContracts.get('GDAXI');
        for (let category in gdaxiContracts) {
            if (gdaxiContracts.hasOwnProperty(category)) {
                for (let tradeType in gdaxiContracts[category]) {
                    const forwardStarting = gdaxiContracts[category][tradeType].forwardStartingDuration;
                    expect(forwardStarting).to.be.ok;
                }
            }
        }
    });
});
