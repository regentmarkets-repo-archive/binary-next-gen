const binaryChannelId = 'UCATAKOpB9mWQGMYgk-Y4MTw';
const key = 'AIzaSyDM8-uF9EGwVl4litOnFGSbBzWodGVRnLU';

const dailyNewsPlaylist = 'PLVJJAiu3lRjYz1XO_yoyIRxgz5zBlQc-g';

const playlistItemApiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const playlistApiUrl = 'https://www.googleapis.com/youtube/v3/playlists';

export const getVideosFromPlayList = async () => {
    let queryUrl = `${playlistItemApiUrl}?part=contentDetails,snippet,status` +
        `&playlistId=${dailyNewsPlaylist}&maxResults=${50}&key=${key}`;

    let response = await fetch(queryUrl);
    let js = await response.json();

    return js.items
        .filter(v => v.status.privacyStatus === 'public')
        .map(v => ({
            imgSrc: v.snippet.thumbnails.medium.url,
            title: v.snippet.title,
            videoId: v.snippet.resourceId.videoId,
        }));
};

const playlistUrl = (channelId, max) =>
    playlistApiUrl + '?' +
        'part=snippet&' +
        'channelId=' + channelId + '&' +
        'maxResults=' + max + '&' +
        'key=' + key;

export const getAllPlaylists = async (channelId = binaryChannelId, max = 50) => {
    let response = await fetch(playlistUrl(channelId, max));
    let js = await response.json();

    return js.items.map(pl => ({
       title: pl.snippet.title,
       playlistId: pl.id,
   }));
};
