import expect from 'expect';
import { fromJS } from 'immutable';
import * as actions from '../../_actions/WorkspaceActions';
import WorkspaceReducer from '../WorkspaceReducer';

describe('WorkspaceReducer', () => {
    it('should be able to be created', () => {
        const state = WorkspaceReducer(undefined, {});
        expect(state).toExist();
    });

    describe('toggleTradeMode', () => {
        it('should be able to toggle trade mode from grid to tabs', () => {
            const stateBefore = fromJS({
                tradeMode: 'grid',
            });
            const actual = WorkspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'tabs',
            });
            expect(actual).toEqual(expected);
        });

        it('should be able to toggle trade mode from tabs to grid', () => {
            const stateBefore = fromJS({
                tradeMode: 'tabs',
            });
            const actual = WorkspaceReducer(stateBefore, actions.toggleTradeMode());
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
            const actual = WorkspaceReducer(stateBefore, actions.togglePanel('left'));
            const expected = fromJS({
                leftPanelVisible: true,
            });
            expect(actual).toEqual(expected);
        });
    });
});
