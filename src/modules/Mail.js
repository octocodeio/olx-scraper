const Config = require('./Config');

module.exports = newOffers => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(Config.mailConnection);
    //Generuj treść HTML
    const html = generateMailHtml(newOffers);
    //Wysyłamy maila
    transporter.sendMail({...Config.mailMessage, html});
}

//Funkcja generuje listę HTML
function generateMailHtml(newOffers){
    return '<ul>' + newOffers.map(renderListElement) + '</ul>';
}

//Funkcja generuje element listy
function renderListElement(offer) {
    return '<li><a href="' + offer.url + '">' + offer.title + '</a> - ' + offer.location + ' za ' + offer.price + '</li>';
}