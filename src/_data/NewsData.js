const api = 'https://js.binary.com/javascript.php';

const params = {
    id: {
        media: '876',
        prefix: '8grqRDVc105iX6ztb0GwqWNd7ZgqdRLk',
    },
    ru: {
        media: '875',
        prefix: 'bPzDzniJKAKx76XffYA0JmNd7ZgqdRLk',
    },
    en: {
        media: '26',
        prefix: 'bPzDzniJKAJHH6eEtUVc2GNd7ZgqdRLk',
    },
};

const getContent = (xmlItem) => {
    let element = xmlItem.getElementsByTagName('content').item(0);
    if (!element || (typeof element === 'undefined')) {
        element = xmlItem.getElementsByTagName('content:encoded').item(0).textContent;
    } else {
        element = xmlItem.getElementsByTagName('content').item(0).textContent;
    }
    return element;
};

const xmlToNewsItem = xmlItem => ({
    title: xmlItem.getElementsByTagName('title').item(0).textContent.replace(/regentmarkets\d.*$/, ''),
    pubDate: xmlItem.getElementsByTagName('pubDate').item(0).textContent.replace(/\+0000$/, 'GMT'),
    description: xmlItem.getElementsByTagName('description').item(0).textContent,
    content: getContent(xmlItem),
});

export const readNewsFeed = async (l) => {
    let queryUrl = `${api}?media=${params[l].media}&prefix=${params[l].prefix}&campaign=1&mode=txt`;

    let domParser = new DOMParser();
    let response = await fetch(queryUrl);
    let xmlText = await response.text();

    let xml = domParser.parseFromString(xmlText, 'text/xml');
    let allItemsList = xml.querySelectorAll('item');

    return Array.from(allItemsList).map(xmlToNewsItem);
};
