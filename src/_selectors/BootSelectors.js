import { createSelector } from 'reselect';

export const bootSelector = createSelector(
    state => state.boot.toJS(),
    boot => ({ ...boot })
);
