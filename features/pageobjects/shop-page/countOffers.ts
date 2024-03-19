// break up the cashrewards.ts file and place the offerScrapper functions and make it generic

import {driver,browser,$,$$} from '@wdio/globals';

// Offer count returned when suppling the element and the offers xpaths
const offerCount = async (vRawList_xpath, vRawOffers_xpath) => {
    let elements = await $(vRawList_xpath);
    let returnedElements = elements;

    // alternative:  const offers = async (rawList) => await rawList.findElements(driver.By.xpath(rawOffers_xpath));
    let offers = async (rawList) => await rawList.$$(vRawOffers_xpath);
    let returnedOffers = await offers(returnedElements);
    // Total Offers Count:
    return await returnedOffers.length;
}
