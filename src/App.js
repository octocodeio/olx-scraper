const Scraper = require('./modules/Scraper');
const Mail = require('./modules/Mail');
const Config = require('./modules/Config');
const _ = require('lodash');
const moment = require('moment');
let offers = [];


function log(message) {
    const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(`[${now}] ${message}`)
}

function getOffers(){
    log('Scrapping...');
    Scraper().then(newOffers => {                
        const beforeScraperOffersLength = offers.length;        
        //Filtrujemy unikalne obiekty na podstawie adresu url z olx.pl
        offers = _.uniqBy([...offers, ...newOffers], 'url');
        log(`Current offers count: ${offers.length}`);
        log(`Before offers count: ${beforeScraperOffersLength}`);
        //Jeśli pojawiły się nowe oferty
        if(offers.length > beforeScraperOffersLength){
            log(`New offers detected, sending an email to ${Config.mailMessage.to}`);
            //Wysyłamy maila        
            Mail(offers);
        }
    });
}
getOffers();
setInterval(getOffers, Config.refreshTime);