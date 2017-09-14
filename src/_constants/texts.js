import * as messages from './po';

const t = {
    DE: messages.de,
    EN: messages.en,
    ES: messages.es,
    FR: messages.fr,
    ID: messages.id,
    IT: messages.it,
    JA: messages.ja,
    PL: messages.pl,
    PT: messages.pt,
    RU: messages.ru,
    TH: messages.th,
    VI: messages.vi,
    ZH_CN: messages.zhCN,
    ZH_TW: messages.zhTW,
};

export default ln => {
    const resultTexts = {};
    const relatedText = t[ln];
    for (var key in relatedText) {
        if (relatedText.hasOwnProperty(key) && relatedText[key] instanceof Array) {
            if(relatedText[key][1] == " ")
              relatedText[key][1] = "";

            resultTexts[key] = relatedText[key][1];
        }
    }
    return resultTexts;
}
