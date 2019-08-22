module.exports = {
    refreshTime: 600000,
    pageURL: 'https://www.olx.pl/nieruchomosci/mieszkania/krakow/',
    mailConnection: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "XX",
            pass: "XX"
        }
    },
    mailMessage: {
        from: 'wojtek@rockandcode.pl',
        to: 'wojtek@rockandcode.pl',
        subject: 'Nowe oferty z olx'
    }
};