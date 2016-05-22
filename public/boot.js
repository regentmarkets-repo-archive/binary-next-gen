(function init() {
    const apiUrl = 'wss://ws.binaryws.com/websockets/v3';
    try {
        window.BinaryBoot = JSON.parse(localStorage.getItem('boot')) || {};
        window.BinaryBoot.connection = new WebSocket(apiUrl + '?app_id=1006&l=' + window.BinaryBoot.language);
    } catch (e) {
        window.console.log('Error while initializing', e);
    }
}());
