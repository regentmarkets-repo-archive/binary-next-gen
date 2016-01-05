import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Direction from '../Direction';

const getOutputForComponent = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
}


describe('Direction', () => {
    it('renders without any properties', () => {
        const output = getOutputForComponent(<Direction />);
        expect(output.type).toEqual('svg');
    });

    it('renders when direction is negative', () => {
        const output = getOutputForComponent(<Direction direction={-1} />);
        expect(output.type).toEqual('svg');
    });

    it('renders when direction is positive', () => {
        const output = getOutputForComponent(<Direction direction={1} />);
        expect(output.type).toEqual('svg');
    });
});
