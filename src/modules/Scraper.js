const puppeteer = require('puppeteer');
const Config = require('./Config');

module.exports = async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(Config.pageURL);
    
    const fetchedOffers = await page.evaluate(() => {
        const offers = Array.from(document.querySelectorAll(`[data-cy="l-card"]`));
        const offersTitles = offers.map( offer => {            
            return {
                title: offer.querySelector('h6').innerText,
                url: offer.querySelector('a').getAttribute('href'),
                price: offer.querySelector('[data-testid="ad-price"]').innerText
                // location: offer.querySelector('.breadcrumb').innerText
            };
        });
        return offersTitles;
    });        
    await browser.close();
    return fetchedOffers;
};