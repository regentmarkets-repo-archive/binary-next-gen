const languageLocaleMap = {
    ZH_CN: 'zh',
    ZH_TW: 'zh',
};

export default ln => languageLocaleMap[ln] || ln.toLowerCase();
