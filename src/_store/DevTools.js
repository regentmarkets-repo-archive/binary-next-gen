export const enableDevTools = () =>
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f;
