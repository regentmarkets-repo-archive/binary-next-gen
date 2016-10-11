import { fromJS } from 'immutable';
import * as actions from '../../_actions/WorkspaceActions';
import workspaceReducer from '../WorkspaceReducer';

describe('workspaceReducer', () => {
    it('should be able to be created', () => {
        const state = workspaceReducer(undefined, {});
        expect(state).toBeDefined();
    });

    describe('toggleTradeMode', () => {
        it('can toggle trade mode from tabs to grid', () => {
            const stateBefore = fromJS({
                tradeMode: 'tabs',
            });
            const actual = workspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'grid',
            });
            expect(expected).toEqual(actual);
        });

        it('should be able to toggle trade mode from grid to jp', () => {
            const stateBefore = fromJS({
                tradeMode: 'grid',
            });
            const actual = workspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'jp',
            });
            expect(expected).toEqual(actual);
        });

        it('should be able to toggle trade mode from jp to tabs', () => {
            const stateBefore = fromJS({
                tradeMode: 'jp',
            });
            const actual = workspaceReducer(stateBefore, actions.toggleTradeMode());
            const expected = fromJS({
                tradeMode: 'tabs',
            });
            expect(expected).toEqual(actual);
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
            expect(expected).toEqual(actual);
        });
    });
});
