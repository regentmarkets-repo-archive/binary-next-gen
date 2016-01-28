import { createSelector } from 'reselect';

export const appConfigSelector = createSelector(
    state => state.appConfig.toJS(),
    appConfig => ({ ...appConfig })
);
