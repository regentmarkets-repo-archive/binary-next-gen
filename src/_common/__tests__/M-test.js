import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import FormattedMessage from 'react-intl';
import M from '../M';

expect.extend(expectJSX);

const renderShallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
};

describe('M', () => {
    it('renders even whithout properties', () => {
        const output = renderShallow(<M />);
        expect(output.type).toNotEqual(null);
    });

    it('renders FormattedMessage', () => {
        const output = renderShallow(<M />);
        const expected = (
            <FormattedMessage />
        );
        expect(output).toIncludeJSX(expected);
    });
});
