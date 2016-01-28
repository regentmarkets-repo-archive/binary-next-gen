const binaryChannelId = 'UCATAKOpB9mWQGMYgk-Y4MTw';
const key = 'AIzaSyDM8-uF9EGwVl4litOnFGSbBzWodGVRnLU';

const dailyNewsPlaylist = 'PLVJJAiu3lRjYz1XO_yoyIRxgz5zBlQc-g';

const playlistItemApiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const playlistApiUrl = 'https://www.googleapis.com/youtube/v3/playlists';

export const getVideosFromPlayList = (playlistId = dailyNewsPlaylist, max = 50) => {
    const queryUrl = `${playlistItemApiUrl}?part=contentDetails,snippet,status` +
        `&playlistId=${playlistId}&maxResults=${max}&key=${key}`;

    return fetch(queryUrl)
        .then(response => response.json())
        .then(json => json.items
            .filter(v => v.status.privacyStatus === 'public')
            .map(v => ({
                imgSrc: v.snippet.thumbnails.medium.url,
                title: v.snippet.title,
                videoId: v.snippet.resourceId.videoId,
            })
        ));
};

const playlistUrl = (channelId, max) =>
    playlistApiUrl + '?' +
        'part=snippet&' +
        'channelId=' + channelId + '&' +
        'maxResults=' + max + '&' +
        'key=' + key;
export const getAllPlaylists = (channelId = binaryChannelId, max = 50) =>
    fetch(playlistUrl(channelId, max))
        .then(response => response.json())
        .then(js =>
            js.items.map(pl => ({
               title: pl.snippet.title,
               playlistId: pl.id,
            })
        ));
