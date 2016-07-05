function onConfirm(buttonIndex) {
    if (buttonIndex === 1) {
        navigator.app.exitApp();
    }
}
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackKeyDown, false);
        document.addEventListener('resume', this.onDeviceResume, false);
    },
    onDeviceReady: function() {
        // codePush.sync();
    },
    onBackKeyDown: function (e) {
        if (window.location.hash === '#/') {
            e.preventDefault();
            navigator.notification.confirm(
                'You are about to exit the app!',
                onConfirm,
                'binary.com',
                ['Exit', 'Continue']
            );
        } else {
            navigator.app.backHistory();
        }
    },
    onDeviceResume: function () {
        // codePush.sync();
    },
};

app.initialize();
