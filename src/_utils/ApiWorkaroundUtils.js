import * as LiveData from '../_data/LiveData';

export const forceStatementUpdate = () => {
    const todayEpoch = Math.floor(Date.now() / 1000) - 86400;
    LiveData.api.getStatement({ description: 1, date_from: todayEpoch });
};

export const forcePortfolioUpdate = () => {
    LiveData.api.getPortfolio();
    LiveData.api.subscribeToAllOpenContracts();
};

export const forceUpdateAll = () => {
    forceStatementUpdate();
    forcePortfolioUpdate();
};
