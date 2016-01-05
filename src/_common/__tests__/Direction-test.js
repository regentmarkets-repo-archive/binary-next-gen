import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Direction from '../Direction';

const renderShallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
}


describe('Direction', () => {
    it('renders without any properties', () => {
        const output = renderShallow(<Direction />);
        expect(output.type).toEqual('svg');
    });

    it('renders when direction is negative', () => {
        const output = renderShallow(<Direction direction={-1} />);
        expect(output.type).toEqual('svg');
    });

    it('renders when direction is positive', () => {
        const output = renderShallow(<Direction direction={1} />);
        expect(output.type).toEqual('svg');
    });
});
