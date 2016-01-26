import { createSelector } from 'reselect';

export const appStateSelector = createSelector(
    state => state.appState.toJS(),
    appState => ({ ...appState })
);
