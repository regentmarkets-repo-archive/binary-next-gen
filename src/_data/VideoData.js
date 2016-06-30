const binaryChannelId = 'UCATAKOpB9mWQGMYgk-Y4MTw';
const key = 'AIzaSyDM8-uF9EGwVl4litOnFGSbBzWodGVRnLU';

const dailyNewsPlaylist = 'PLVJJAiu3lRjYz1XO_yoyIRxgz5zBlQc-g';

const playlistItemApiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const playlistApiUrl = 'https://www.googleapis.com/youtube/v3/playlists';

export const getVideosFromPlayList = async () => {
    const queryUrl = `${playlistItemApiUrl}?part=contentDetails,snippet,status` +
        `&playlistId=${dailyNewsPlaylist}&maxResults=${50}&key=${key}`;

    const response = await fetch(queryUrl);
    const js = await response.json();

    return js.items
        .filter(v => v.status.privacyStatus === 'public')
        .map(v => ({
            imgSrc: (v.snippet.thumbnails.maxres || v.snippet.thumbnails.high).url,
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
    const response = await fetch(playlistUrl(channelId, max));
    const js = await response.json();

    return js.items.map(pl => ({
       title: pl.snippet.title,
       playlistId: pl.id,
   }));
};
