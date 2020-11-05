const getPrices = require('./getPrices');

(async () => {
    const fligthsDublin1 = await getPrices({
        dateStart: '2020-10-05',
        dateEnd: '2020-10-09',
        city: 'Dublin',
        country: 'Irlande'
    });

    // console.log('fligthsDublin1', fligthsDublin1);
    

    const fligthsDublin2 = await getPrices({
        dateStart: '2020-10-26',
        dateEnd: '2020-10-31',
        city: 'Dublin',
        country: 'Irlande'
    });

    // console.log('fligthsDublin2', fligthsDublin2);
    

    const fMar = await getPrices({
        dateStart: '2020-10-12',
        dateEnd: '2020-10-17',
        city: 'Marrakech',
        country: 'Maroc'
    });

    const fMar2 = await getPrices({
        dateStart: '2020-10-26',
        dateEnd: '2020-10-31',
        city: 'Marrakech',
        country: 'Maroc'
    });

    // console.log('fMar', fMar);
    

    const fLis = await getPrices({
        dateStart: '2020-10-12',
        dateEnd: '2020-10-17',
        city: 'Lisbonne',
        country: 'Portugal'
    });

    const fLis2 = await getPrices({
        dateStart: '2020-10-26',
        dateEnd: '2020-10-31',
        city: 'Lisbonne',
        country: 'Portugal'
    });



    // console.log('Dublin1.outbound', fligthsDublin1.flightsData.outbound);
    // console.log('Dublin1.inbound', fligthsDublin1.flightsData.inbound);
    console.log('Dublin1.outbound', fligthsDublin1.flightsData.outbound.map(f => f.price));
    console.log('Dublin1.inbound', fligthsDublin1.flightsData.inbound.map(f => f.price));

    console.log('Dublin2.outbound', fligthsDublin2.flightsData.outbound.map(f => f.price));
    console.log('Dublin2.inbound', fligthsDublin2.flightsData.inbound.map(f => f.price));

    console.log('Maroc1.outbound', fMar.flightsData.outbound.map(f => f.price));
    console.log('Maroc1.inbound', fMar.flightsData.inbound.map(f => f.price));
    console.log('Maroc2.outbound', fMar2.flightsData.outbound.map(f => f.price));
    console.log('Maroc2.inbound', fMar2.flightsData.inbound.map(f => f.price));
    // console.log('fLis', fLis);
    console.log('Lisbonne.outbound', fLis.flightsData.outbound.map(f => f.price));
    console.log('Lisbonne.inbound', fLis.flightsData.inbound.map(f => f.price));
    console.log('Lisbonne2.outbound', fLis2.flightsData.outbound.map(f => f.price));
    console.log('Lisbonne2.inbound', fLis2.flightsData.inbound.map(f => f.price));
})();