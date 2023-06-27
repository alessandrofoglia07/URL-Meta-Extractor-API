import * as cheerio from 'cheerio';
const getMetaTags = (html, tag) => {
    const $ = cheerio.load(html);
    if (tag) {
        const metaTag = $(`meta[name=${tag}]`).attr('content') || $(`meta[property=${tag}]`).attr('content');
        return metaTag;
    }
    const metaTags = {};
    $('meta').each((i, el) => {
        const tag = $(el).attr('name') || $(el).attr('property');
        const value = $(el).attr('content');
        if (!tag || !value)
            return;
        metaTags[tag] = value;
    });
    return metaTags;
};
export default getMetaTags;
