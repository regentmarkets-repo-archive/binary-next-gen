import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { assetsSelector } from './directSelectors';

export const assetsBySymbolSelector = createSelector(
	assetsSelector,
	assets =>
		assets.reduce((acc, v) =>
			acc.set(v.get('symbol'), v), new Map())
);
