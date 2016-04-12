(function init() {
    const apiUrl = 'wss://ws.binaryws.com/websockets/v3';
    try {
        window.BinaryInit = JSON.parse(localStorage.getItem('init')) || {};
        window.BinaryInit.connection = new WebSocket(`${apiUrl}?l=${window.BinaryInit.language}`);
    } catch (e) {
        window.console.log('Error while initializing', e);
    }
}());
