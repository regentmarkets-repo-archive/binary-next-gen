export default class Device {
    static isAndroid() {
        return /(android)/i.test(navigator.userAgent);
    }

    static isAndroidApp() {
        return window.cordova && device.platform === 'Android';
    }

    static isIOSSafari() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const webkit = !!ua.match(/WebKit/i);
        const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
        return iOSSafari;
    }
}
