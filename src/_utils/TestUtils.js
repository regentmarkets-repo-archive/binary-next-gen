import TestUtils from 'react-addons-test-utils';
export * from 'react-addons-test-utils';

export const renderShallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
};
