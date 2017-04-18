export default () =>
    (typeof window !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f);
