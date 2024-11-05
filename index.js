// server.js
const express = require('express');
const yts = require('yt-search');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Search endpoint
app.post('/api/search', async (req, res) => {
    try {
        const { query } = req.body;
        const results = await yts(query);
        const videos = results.videos.slice(0, 12).map(video => ({
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            duration: video.duration.timestamp,
            views: video.views,
            author: video.author.name
        }));
        res.json(videos);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Failed to search videos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
