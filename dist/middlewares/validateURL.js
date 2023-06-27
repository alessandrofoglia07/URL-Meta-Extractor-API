import { sanitizeUrl } from '@braintree/sanitize-url';
/**
 * @desc Validates the URL provided by the user, preventing XSS attacks
 * @param req
 * @param res
 * @param next
 */
const validateURL = (req, res, next) => {
    const { url } = req.body;
    if (!url)
        return res.status(400).json({ message: 'URL is required' });
    const sanitizedURL = sanitizeUrl(url);
    const URLRegex = /(https: \/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;
    if (URLRegex.test(sanitizedURL)) {
        req.websiteURL = sanitizedURL;
        return next();
    }
    else {
        return res.status(400).json({ message: 'Invalid URL' });
    }
};
export default validateURL;
