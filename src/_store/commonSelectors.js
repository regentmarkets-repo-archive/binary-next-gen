import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { assetsSelector, workspaceSelector } from './directSelectors';

export const examinedAssetSelector = createSelector(
	[assetsSelector, workspaceSelector],
	(assets, workspace) =>
        assets.find(x => x.get('symbol') === workspace.get('examinedAsset')) ||
        assets.find(a => !!a.get('exchange_is_open')) ||
		fromJS({})
);
