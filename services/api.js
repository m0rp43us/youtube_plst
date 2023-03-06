const axios =require('axios');
const moment = require('moment');
const { secondsToString } = require('./utils');

var key = process.env.API_KEY;

module.exports.getPlaylistDataAPI = async (listId) => {
    try {
        var url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&part=snippet&key=${key}&fields=nextPageToken,items(snippet(resourceId(videoId)))&maxResults=500`
        const response = await axios.get(url);
        var ids = response.data.items.map(function(item) {
            return item['snippet']['resourceId']['videoId'];
          });
        return ids;
    } catch (error) {
        console.error(error);
    }
}

module.exports.getVideoDurationAPI = async (videosIds) => {
    let durations = {};
    try {
            var url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videosIds.join()}&maxResults=500&fields=items(id,contentDetails(duration))&key=${key}`        
            const response = await axios.get(url);
            var { items } = response.data;
            items.map((item) => {
                var { id, contentDetails: { duration }} = item;
                durations[id] = moment.duration(duration).asSeconds();
            });
            var sumduration = obj => Object.values(obj).reduce((a, b) => a + b, 0);
            return {
                number_items : videosIds.length,
                average_length : secondsToString(sumduration(durations)/videosIds.length),
                total_length : secondsToString(sumduration(durations)),
                total_length_quarter : secondsToString(sumduration(durations) /1.25),
                total_length_half : secondsToString(sumduration(durations) /1.5),
                total_length_three_quarters : secondsToString(sumduration(durations) / 1.75),
                total_length_double : secondsToString(sumduration(durations) /2 ),
            };
    } catch (error) {
        console.error(error)       
    }
}