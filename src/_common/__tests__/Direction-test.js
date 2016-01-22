import React from 'react';
import expect from 'expect';
import { renderShallow } from '../../_utils/TestUtils';
import Direction from '../Direction';

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
