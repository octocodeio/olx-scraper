const puppeteer = require('puppeteer');
const Config = require('./Config');

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(Config.pageURL);
    const fetchedOffers = await page.evaluate(() => {
        const offers = Array.from(document.querySelectorAll(".offer-wrapper"));
        const offersTitles = offers.map( offer => {            
            return {
                title: offer.querySelector('strong').innerText,
                url: offer.querySelector('.link').getAttribute('href'),
                price: offer.querySelector('.price strong').innerText,
                location: offer.querySelector('.breadcrumb').innerText
            };
        });
        return offersTitles;
    });        
    await browser.close();
    return fetchedOffers;
};