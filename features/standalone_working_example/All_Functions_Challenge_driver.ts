// Import the necessary modules from selenium-webdriver
import {driver,browser,$,$$} from '@wdio/globals';


// Create a new WebDriver instance


interface OfferCards {
    id: string;
    title: string;
    url: string;
    discount: string;
    active: boolean;
}

const rawList_xpath = "*//div[@data-test-id='featured-offers-carousel']//div[@data-test-id='list']";
const rawOffers_xpath = "*[@data-slide-intersection-ratio]";
const rawOffer_Tile = "//span[@data-test-id='card-content-title']";
const rawOffer_Discount = "//span[@data-test-id='offer-card-discount']";
const rawOffer_Commisson = "//span[@data-test-id='offer-card-commission']";
const rawOfferActive = "data-slide-intersection-ratio";
const rawOfferLink = ".//a";


// all OFFERS - Returns all the offers in the rawList_xpath > rawOffers_xpath divs in an object (id,title,url,discount/commision, active(visible on the screen))

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


// VISIBLE OFFERS ==== Loop through the Offer tiles and search for Active/True status and store into an array for comparison later
const visibleOffers = async (offerList) => {
    // console.log("# in function visibleOffers.....");
    let activeOfferIds: {id: string}[] = [];
    for (const activeOffers of offerList) {
        if (activeOffers.active == true) {
            activeOfferIds.push({id: activeOffers.id});
        }
    }
    return activeOfferIds;
}


// Returns Offer Container Screen width for scrolling calculation
const screenWidth = async (vRawList_xpath) => {
    let elementScreenWidth = await $(vRawList_xpath);
    return await elementScreenWidth.getSize('width');
}

// Current Scroll bar Positon in the Offers List Container
let scrollPosition = async (vRawList_xpath) => {
    type elemtype = any; // hack to shoosh ts
    let elements: elemtype = await $(vRawList_xpath);
    //let elements = await driver.findElement(driver.By.xpath(vRawList_xpath));
    return await driver.executeScript("return arguments[0].scrollLeft", elements);
    // could use scrollIntoView(element number x) as an alternative
}

// Returns the Total number of Screen Pixels to scroll for all offers in list when supplying the element and offer
const totalScrollWidth = async (vRawList_xpath, vRawOffers_xpath) => {
    let screenSize = Number(screenWidth(vRawList_xpath));
    let totalOfferCount = await offerCount(vRawList_xpath, vRawOffers_xpath);
    let vAllOffers =  await allOffers(vRawList_xpath, vRawOffers_xpath, rawOffer_Tile, rawOffer_Discount, rawOffer_Commisson, rawOfferActive, rawOfferLink);
    let resultantVisibleOffers = await visibleOffers(vAllOffers);
    let numScreensToScroll = Math.ceil(await totalOfferCount / resultantVisibleOffers.length);
    return (numScreensToScroll * screenSize) ;
}

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


// Compare ACTIVE Offers
const tileCompare = (previousActOffers,currentActOffers) => {
    console.log("Comparing Tiles...");
    if (!previousActOffers || !currentActOffers) { return true;}
    const previous = previousActOffers.map(item => item.id);
    const current  = currentActOffers.map(item => item.id);
    if (previousActOffers.length != currentActOffers.length) {
        return true;
    } else {
        for  (let i =0; i< previous.length; i++) {
            if (previous[i] != current[i]){
                return true;
            }
            else {
                return false;
            }
        }
    }
}




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


async function scrollForwardsandCompare() {
    // Scrape all the offer elements using xpath
    const updateAllOffers =  await allOffers (rawList_xpath, rawOffers_xpath, rawOffer_Tile, rawOffer_Discount, rawOffer_Commisson, rawOfferActive, rawOfferLink);
    // update master list of offers
    // Create an array of only active/visible Offers (xpatch attribute value = 1)
    const previousOffers = await visibleOffers(updateAllOffers);
    //console.log("Previous Offers: "+  JSON.stringify(previousOffers));
    const activeOffers = await forwards(rawList_xpath, rawOffers_xpath);
    const scrollSuccessful = tileCompare(previousOffers, activeOffers);
    //console.log("Scroll Successful?: " + scrollSuccessful);
    return updateAllOffers;
}



// Navigate to a webpage
(async function test() {

    try {
        await driver.url('https://www.cashrewards.com.au/shop');

        // Return the count of offer tiles
        console.log(offerCount(rawList_xpath, rawOffers_xpath));
        // Scroll forwards and verify it worked
        await scrollForwardsandCompare();
        /// TODO find Ebay card using // card-content-title
        let offers = allOffers(rawList_xpath, rawOffers_xpath, rawOffer_Tile, rawOffer_Discount, rawOffer_Commisson, rawOfferActive, rawOfferLink);
        // pseudo code:  find offer.title = 'ebay' and extract the offer.url and then navgiate to the page.

} finally {
    // Close the browser
    await driver.deleteSession();
}
})();





