import * as messages from './po';

const t = {
    AR: messages.ar,
    DE: messages.de,
    EN: messages.en,
    ER: messages.es,
    FR: messages.fr,
    ID: messages.id,
    IT: messages.it,
    JA: messages.ja,
    PL: messages.pl,
    PT: messages.pt,
    RU: messages.ru,
    VI: messages.vi,
    ZH_CN: messages.zhCN,
    ZH_TW: messages.zhTW,
};

export default ln => {
    const resultTexts = {};
    const relatedText = t[ln];
    for (var key in relatedText) {
        if (relatedText.hasOwnProperty(key) && relatedText[key] instanceof Array) {
            resultTexts[key] = relatedText[key][1];
        }
    }
    return resultTexts;
}
