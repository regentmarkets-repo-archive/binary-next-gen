import * as LiveData from '../_data/LiveData';
import { todayEpoch } from './DateUtils';

export const forceStatementUpdate = () => {
    LiveData.api.getStatement({ description: 1, date_from: todayEpoch() });
};

export const forcePortfolioUpdate = () => {
    LiveData.api.getPortfolio();
    LiveData.api.subscribeToAllOpenContracts();
};

export const forceUpdateAll = () => {
    forceStatementUpdate();
    forcePortfolioUpdate();
};
