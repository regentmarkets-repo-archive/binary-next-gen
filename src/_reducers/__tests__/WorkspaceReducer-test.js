import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/WorkspaceActions';
import workspaceReducer from '../WorkspaceReducer';

describe('WorkspaceReducer', () => {
    it('should be able to be created', () => {
        const state = workspaceReducer(undefined, {});
        expect(state).toExist();
    });

    describe('toggleTradeMode', () => {
        it('should be able to toggle trade mode from grid to tabs', () => {
            const stateBefore = fromJS({
                tradeMode: 'grid',
            });
            const actual = workspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'tabs',
            });
            expect(actual).toEqual(expected);
        });

        it('should be able to toggle trade mode from tabs to grid', () => {
            const stateBefore = fromJS({
                tradeMode: 'tabs',
            });
            const actual = workspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'grid',
            });
            expect(actual).toEqual(expected);
        });
    });

    describe('togglePanel', () => {
        it('should be able to toggle left panel to visible', () => {
            const stateBefore = fromJS({
                leftPanelVisible: false,
            });
            const actual = workspaceReducer(stateBefore, actions.togglePanel('left'));
            const expected = fromJS({
                leftPanelVisible: true,
            });
            expect(actual).toEqual(expected);
        });
    });
});
