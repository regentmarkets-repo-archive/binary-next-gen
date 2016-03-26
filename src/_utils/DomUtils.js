export const windowResizeEvent = () => {
    if (typeof window === 'undefined') return;
    setTimeout(() =>
        window.dispatchEvent(new Event('resize'))
    , 100);
};
