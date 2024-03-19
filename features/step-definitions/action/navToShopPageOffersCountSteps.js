import { Given, When, Then, And } from '@wdio/cucumber-framework';
import { driver, browser, expect, $, $$ } from '@wdio/globals' ;

// tried "([^\"]*)", (.*) nothing seems to match and store the url as a parameter???
Given(/^I open the {string} URL$/, async (url) => {
    await browser.url(url);

});

When(/^I click the "([^\"]*)" tag "([^\"]*)" link$/, async (tag, link) => {
    const menuTag = tag;
    const theLink = menuTag.$('a*='+ link);
});

Then(/^I should be redirected to the "([^\"]*)" page$/, async (pageName) => {
    expect(browser).toHaveTitle(pageName);
});

And(/^I should see greater than ([0-9]+) offers on the (\w+) list carousel$/, async (numofOffers,carouselName) => {
    await offerCount(exp,numofOffers,carouselName)
    await expect(await OfferCount.offers(offerContainer)).toBeGreaterThan(numofOffers);
    console.log("The number of Offers is:"+ await OfferCount.offers(offerContainer));
});
