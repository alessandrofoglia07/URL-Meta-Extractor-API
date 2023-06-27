import * as cheerio from 'cheerio';
import { MetaTags } from '../types';

const getMetaTags = (html: string, tag?: string): MetaTags | string | undefined => {
    const $ = cheerio.load(html);

    if (tag) {
        const metaTag = $(`meta[name=${tag}]`).attr('content') || $(`meta[property=${tag}]`).attr('content');

        return metaTag;
    }

    const metaTags: MetaTags = {};

    $('meta').each((i: number, el: cheerio.Element) => {
        const tag = $(el).attr('name') || $(el).attr('property');
        const value = $(el).attr('content');

        if (!tag || !value) return;

        metaTags[tag] = value;
    });

    return metaTags;
};

export default getMetaTags;