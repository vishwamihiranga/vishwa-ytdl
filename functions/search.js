const yts = require('yt-search');

exports.handler = async (event) => {
    // Check if the request is a POST request
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    // Parse the request body
    const { query } = JSON.parse(event.body);

    try {
        // Perform the search using yt-search
        const results = await yts(query);
        const videos = results.videos.slice(0, 12).map(video => ({
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            duration: video.duration.timestamp,
            views: video.views,
            author: video.author.name
        }));

        // Return the video results
        return {
            statusCode: 200,
            body: JSON.stringify(videos),
        };
    } catch (error) {
        console.error('Search error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to search videos' }),
        };
    }
};
