import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
// import Tabs from '../Tabs';

expect.extend(expectJSX);

const renderShallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
};

describe('Tabs', () => {
    it('renders correctly with no properties', () => {
        const output = renderShallow(<Tabs />);
        const expected = (
            <div role="tabs" />
        );
        expect(output).toIncludeJSX(expected);
    });
});
