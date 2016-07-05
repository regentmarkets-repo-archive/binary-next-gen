var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onDeviceResume, false);
    },
    onDeviceReady: function() {
        // codePush.sync();
    },
    onDeviceResume: function () {
        // codePush.sync();
    },
};

app.initialize();
