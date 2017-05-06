import { fromJS, Map } from 'immutable';
import assetsFromServer from 'binary-test-data/assets';
import contractsForR50 from 'binary-test-data/contractsForR50';
import contractsForGDAXI from 'binary-test-data/contractsForGDAXI';
import * as TradeSelectors from '../../trade-params/TradeParamsSelector';

describe('assetsIsOpenSelector', () => {
    const assetsIsOpen = TradeSelectors.assetsIsOpenSelector({ assets: fromJS(assetsFromServer) });

    it('should create a tree with isOpen as key of each children', () => {
        for (const symbol in assetsIsOpen) {
            expect(assetsIsOpen[symbol].isOpen).toBeDefined();
        }
    });

    it('should create a tree with isOpen correctly set based on input', () => {
        expect(assetsIsOpen.frxAUDJPY.isOpen).toBeTruthy();
    });

    it('should return all symbol passed in', () => {
        const inputLen = assetsFromServer.length;
        const outputLen = Object.keys(assetsIsOpen).length;
        expect(inputLen).toEqual(outputLen);
    });
});

describe('availableContractsSelector', () => {
    const availableContracts = TradeSelectors.availableTradingOptionsSelector({
        assets: fromJS(assetsFromServer),
        tradingOptions: new Map({ R_50: contractsForR50, GDAXI: contractsForGDAXI }),
    });

    it('should return contract if symbol is opened', () => {
        expect(availableContracts.get('R_50')).toBeDefined();
    });

    it('should return contract if symbol is closed, but offer startLater options', () => {
        expect(availableContracts.get('GDAXI')).toBeDefined();
    });

    it('should not return contract if symbol is closed, and does not offered startLater options', () => {
        const gdaxiContracts = availableContracts.get('GDAXI');
        for (const category in gdaxiContracts) {
            if (gdaxiContracts.hasOwnProperty(category)) {
                for (const tradeType in gdaxiContracts[category]) {
                    const forwardStarting = gdaxiContracts[category][tradeType].forwardStartingDuration;
                    expect(forwardStarting).toBeDefined();
                }
            }
        }
    });
});
