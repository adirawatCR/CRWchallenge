
// break up the cashrewards.ts file and place the offerScrapper functions and make it generic

import {driver,browser,$,$$} from '@wdio/globals';


interface OfferCards {
    id: string;
    title: string;
    url: string;
    discount: string;
    active: boolean;
}

let allOffers = async (vRawList_xpath, vRawOffers_xpath, vRawOffer_Tile, vRawOffer_Discount, vRawOffer_Commisson, vRawOfferActive, vRawOfferLink) => {
    // All the elements
    const elements = await $(vRawList_xpath);
    const returnedElement = elements;
    // all the Offer divs
    const offers = async (rawList) => await rawList.$$(vRawOffers_xpath);
    let returnedOffers = await offers(returnedElement);

    console.log("# in function allOffers.....");
    let allCards: OfferCards[] = [];
    var count = 0

    // offerTiles = rawList_xpath
    for (const offerTile of await returnedOffers) {
        // determine if the offer is visible
        let visible = false;
        let activeOffer = 0.0;
        let offeridValue = "";
        let offerUrl = "";
        let discountText = "";
        let titleText = "";
        let offerCard: OfferCards = { id: "", title: "", url: "", discount: "", active: false};
        try {
            let activeOffer = parseFloat(await offerTile.getAttribute(vRawOfferActive));
            if (activeOffer >= 1) {
                visible = true;
                console.log('visible: '+ activeOffer);
            }
        } catch (error){
            activeOffer <= 0.0;
        }

        // get unique offer id
        // let offerid = await offerTile.findElement(driver.By.xpath(rawOfferLink));
        let offerid = await offerTile.$(vRawOfferLink);
        offeridValue = await offerid.getAttribute("data-test-id");
        //console.log("offeridValue:", await offeridValue);
        // get Offer URL
        // let offerUrlElement = await offerTile.findElement(webdriver.By.xpath(rawOfferLink));
        let offerUrlElement = await offerTile.$(vRawOfferLink);
        offerUrl = await offerUrlElement.getAttribute("href");
        //console.log("offerurl:", await offerUrl);

        // get Offer Title
        try {
            // let offerTitle = await offerTile.findElement(webdriver.By.xpath(rawOffer_Tile));
            let offerTitle = await offerTile.$(vRawOffer_Tile);
            titleText = await offerTitle.getText();
            // console.log('offerTitle:', titleText);
            } catch (error){
                titleText = "notfound";
            }

        // get Offer Discount
        try {
            // let offerDiscount = await offerTile.findElement(webdriver.By.xpath(rawOffer_Discount));
            let offerDiscount = await offerTile.$(vRawOffer_Discount);
            discountText = await offerDiscount.getText();
            } catch (error){
                discountText = "notfound";
            }
        if (discountText == "notfound") {
            try {
                // let offerDiscount = await offerTile.findElement(webdriver.By.xpath(rawOffer_Commisson));
                let offerDiscount = await offerTile.$(vRawOffer_Commisson);
                discountText = await offerDiscount.getText();
                } catch (error){
                    discountText = "notfound";
                }
        }
        // Update Array of Offer Objects
        offerCard = {id: offeridValue, title: titleText, url: offerUrl, discount: discountText, active: visible};
        allCards.push(offerCard);
        };
    return allCards;
};