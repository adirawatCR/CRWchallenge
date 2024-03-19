// break up the cashrewards.ts file and place the scroll forwards and backwards functions here and make it generic
import {driver,browser,$,$$} from '@wdio/globals';

import screenWidth from 'screenWidth.ts';

 // Scrolls FORWARDS the length of the current screen width only.
 const forwards = async (vRawList_xpath, vRawOffers_xpath) => {
    type elem = any; // Hack
    let elements: elem = await $(vRawList_xpath);
    let screenRes = await screenWidth(vRawList_xpath);
    let totalScrollSize =  await totalScrollWidth(vRawList_xpath, vRawOffers_xpath);
    let scrollPos = await scrollPosition(vRawList_xpath);
    console.log("Scrolling Forwards ... ")
    if (scrollPos < totalScrollSize) {
        await driver.executeScript(`arguments[0].scrollLeft += ${screenRes}`, elements);
        scrollPos = await scrollPosition(vRawList_xpath);
        let activeCardTiles = [{}];
        let refreshedAllOffers =  await allOffers(rawList_xpath, rawOffers_xpath, rawOffer_Tile, rawOffer_Discount, rawOffer_Commisson, rawOfferActive, rawOfferLink);
        activeCardTiles = await visibleOffers(refreshedAllOffers);
        return activeCardTiles;
    } else {
        console.log("No more offers, end of List, scroll backwards instead");
    }
}


 // Scrolls BACKWARDS the length of the current screen width only.

 const backwards = async (vRawList_xpath, vRawOffers_xpath) => {
    type elem = any; // Hack
    let elements: elem = await $(vRawList_xpath);
    let screenRes = await screenWidth(vRawList_xpath);
    let totalScrollSize =  await totalScrollWidth(vRawList_xpath, vRawOffers_xpath);
    let scrollPos = await scrollPosition(vRawList_xpath);
    console.log("Scrolling Forwards ... ")
    if (scrollPos >= screenRes) {
        await driver.executeScript(`arguments[0].scrollLeft -= ${screenRes}`, elements);
        scrollPos = await scrollPosition(vRawList_xpath);
        let activeCardTiles = [{}];
        let refreshedAllOffers =  await allOffers(rawList_xpath, rawOffers_xpath, rawOffer_Tile, rawOffer_Discount, rawOffer_Commisson, rawOfferActive, rawOfferLink);
        activeCardTiles = await visibleOffers(refreshedAllOffers);
        return activeCardTiles;
    } else {
        console.log("No more offers to display, At Beginning of List");
    }
}