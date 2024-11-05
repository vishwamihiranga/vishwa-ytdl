// server.js
const express = require('express');
const yts = require('yt-search');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Search endpoint
app.post('/api/search', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

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

// Catch-all route to serve index.html for any non-API routes (for single-page apps)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
