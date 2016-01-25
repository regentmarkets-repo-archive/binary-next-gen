import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import { renderShallow } from '../../_utils/TestUtils';
import LogoSpinner from '../LogoSpinner';

expect.extend(expectJSX);

describe('LogoSpinner', () => {
    it('renders image element', () => {
        const output = renderShallow(<LogoSpinner />);
        expect(output.type).toEqual('img');
    });

    it('is static (no classes applied) if spinning is false', () => {
        const output = renderShallow(<LogoSpinner spinning={false} />);
        expect(output.props.className).toEqual('');
    });

    it('is animated (via a class) if spinning is true', () => {
        const output = renderShallow(<LogoSpinner spinning={true} />);
        expect(output.props.className).toEqual('spinner');
    });
});
