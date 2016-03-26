export const windowResizeEvent = () => {
    if (!window) return;
    setTimeout(() =>
        window.dispatchEvent(new Event('resize'))
    , 100);
};
