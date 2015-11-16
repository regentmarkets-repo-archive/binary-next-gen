const api = 'http://js.binary.com/javascript.php';

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

export const getNews = (l = 'en') => {
    const queryUrl = `${api}?media=${params[l].media}&prefix=${params[l].prefix}&campaign=1&mode=txt`;

    const domParser = new DOMParser();

    return window.fetch(queryUrl).
        then((response) => {
            return response.text();
        }).
        then((xmlText) => {
            const xml = domParser.parseFromString(xmlText, 'text/xml');
            const allItemsList = xml.querySelectorAll('item');

            return Array.prototype.map.call(allItemsList, item => {
                const title = item.getElementsByTagName('title').item(0).textContent.replace(/regentmarkets\d.*$/, '');
                const pubDate = item.getElementsByTagName('pubDate').item(0).textContent.replace(/\+0000$/, 'GMT');
                const content = () => {
                    const post = item.getElementsByTagName('content\\:encoded').item(0);
                    return post ? post.textContent : item.getElementsByTagName('encoded').item(0).textContent;
                }();

                return {
                    title,
                    pubDate,
                    content,
                };
            });
        });
};
