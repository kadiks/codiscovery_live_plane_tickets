const puppeteer = require('puppeteer');
 



const getPrices = async ({
    dateStart,
    dateEnd,
    country,
    city
}) => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    page.setViewport({
        width: 1400,
        height: 900
    });
    // Go to Ryanair homepage
    console.log(`Getting prices for Paris-${city} from ${dateStart} to ${dateEnd}`); 
    console.log('Loading homepage...');
    await page.goto('https://www.ryanair.com/fr/fr');
    //   await page.screenshot({path: 'example.png'});
    
    console.log('Homepage loaded');
    // click on destination input to open possibilities
    await page.click('#input-button__destination');

    // wait for 1s
    await page.waitForTimeout(500);

    // get country span element by text 
    const [spanCountry] = await page.$x(`//span[contains(., ' ${country} ')]`);
    // console.log('spanCountry', spanCountry);
    if (spanCountry) {
        console.log('spanCountry will be clicked');
        await spanCountry.click();
    }

    // wait for 1s
    await page.waitForTimeout(500);

    // get city span element by text 
    const [spanCity] = await page.$x(`//span[contains(., ' ${city} ')]`);
    // console.log('spanCity', spanCity);
    if (spanCity) {
        console.log('spanCity will be clicked');
        await spanCity.click();
    }
    // wait for 1s
    await page.waitForTimeout(3000);

    // click on date start
    await page.click(`[data-id="${dateStart}"]`);
    // wait for 1s
    await page.waitForTimeout(200);

    // click on date end
    await page.click(`[data-id="${dateEnd}"]`);
    // wait for 1s
    await page.waitForTimeout(200);

    // click on submit
    await page.click('.flight-search-widget__start-search');
    // wait for 3s
    console.log('click on submit wait');
    await page.waitForTimeout(10000);
    
    // all outbound flights el : var flights = Array.from(document.querySelectorAll('journey-container[outbound] flight-card'));
    // price: flights[0].querySelector('.price-value').textContent
    // hour departure: flights[0].querySelector('[data-ref="flight-segment.departure"] span.h2').textContent
    // city departure flights[0].querySelector('[data-ref="flight-segment.departure"] span.time__city').textContent
    // hour arrival: flights[0].querySelector('[data-ref="flight-segment.arrival"] span.h2').textContent
    // city arrival flights[0].querySelector('[data-ref="flight-segment.arrival"] span.time__city').textContent
    // flights[0].querySelector('.duration').textContent


    // do not have access to document
    const flightData = await page.evaluate(() => {
        // access to document

        const flightsOutbound = Array.from(document.querySelectorAll('journey-container[outbound] flight-card'));
        const outboundData = flightsOutbound.map((flightCardEl) => {
            const price = flightCardEl.querySelector('.price-value').textContent;
            const departure = {
                time: flightCardEl.querySelector('[data-ref="flight-segment.departure"] span.h2').textContent,
                city: flightCardEl.querySelector('[data-ref="flight-segment.departure"] span.time__city').textContent
            };
            const arrival = {
                time: flightCardEl.querySelector('[data-ref="flight-segment.arrival"] span.h2').textContent,
                city: flightCardEl.querySelector('[data-ref="flight-segment.arrival"] span.time__city').textContent
            };

            const duration = flightCardEl.querySelector('.duration').textContent;

            return {
                price,
                departure,
                arrival,
                duration
            };

        });


        const flightsInbound = Array.from(document.querySelectorAll('journey-container[inbound] flight-card'));
        const inboundData = flightsInbound.map((flightCardEl) => {
            const price = flightCardEl.querySelector('.price-value').textContent;
            const departure = {
                time: flightCardEl.querySelector('[data-ref="flight-segment.departure"] span.h2').textContent,
                city: flightCardEl.querySelector('[data-ref="flight-segment.departure"] span.time__city').textContent
            };
            const arrival = {
                time: flightCardEl.querySelector('[data-ref="flight-segment.arrival"] span.h2').textContent,
                city: flightCardEl.querySelector('[data-ref="flight-segment.arrival"] span.time__city').textContent
            };

            const duration = flightCardEl.querySelector('.duration').textContent;

            return {
                price,
                departure,
                arrival,
                duration
            };

        });

        return {
            outbound: outboundData,
            inbound: inboundData
        };
    });

    // console.log(flightData);

    // wait for 10s
    // await page.waitForTimeout(1000000);

    await browser.close();

    console.log(`Prices Paris-${city} from ${dateStart} to ${dateEnd} loaded`);
    console.log('---'); 

    return {
        dateStart,
        dateEnd,
        city,
        country,
        flightsData: flightData
    };
};


module.exports = getPrices;