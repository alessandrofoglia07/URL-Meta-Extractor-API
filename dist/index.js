import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import validateURL from './middlewares/validateURL.js';
import getMetaTags from './utils/getMetaTags.js';
import { rateLimit } from 'express-rate-limit';
const app = express();
// Rate limiter to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500
});
app.use(cors());
app.use(express.json());
app.use(validateURL);
app.use(limiter);
const PORT = 5000;
/**
 * @route GET /metatags
 * @desc Extracts metatags from a given URL
 * @access Public
 * @body { url: string }
 * @returns {object}
 */
app.get('/metatags', async (req, res) => {
    const url = req.websiteURL;
    try {
        const response = await fetch(url);
        const html = await response.text();
        const metaTags = getMetaTags(html);
        return res.json({ message: 'Process successful', analizedURL: url, metaTags });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
/**
 * @route GET /metatag/:tag
 * @desc Extracts a specific metatag from a given URL
 * @access Public
 * @body { url: string }
 * @param tag
 * @returns {string | undefined}
 */
app.get('/metatag/:tag', async (req, res) => {
    const url = req.websiteURL;
    const { tag } = req.params;
    if (!tag)
        return res.status(400).json({ message: 'Tag is required' });
    try {
        const response = await fetch(url);
        const html = await response.text();
        const metaTag = getMetaTags(html, tag);
        const metaTags = {};
        metaTags[tag] = metaTag;
        return res.json({ message: 'Process successful', metaTags });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
app.listen(PORT, () => console.log(`\nServer running on port ${PORT}. \n\nOpen at http://localhost:${PORT}`));
