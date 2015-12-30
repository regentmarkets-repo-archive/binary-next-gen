const analytics = window.ga;

export const trackRoute = (route) =>
    analytics('send', 'pageview', route);

export const trackEvent = (fields) =>
    analytics('send', {
        hitType: 'event',
        ...fields,
    });
