import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import scrollStep from '../../pageobjects/generic/actions/screenWidth.js';
import scrollStep from '../pageobjects/generic/actions/scrollpoisiton.js';
import scrollStep from '../../pageobjects/generic/actions/scroll.js';
import scrollStep from '../../pageobjects/generic/actions/navigateTo.js';


Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
});

When(/^There are greater than (\[0-9]+) offers $/, async (offerCount) => {
    await expect(await OfferCount.offers(offerContainer)).toBeGreaterThan(offerCount);
});

When(/^I scroll (\w_)) (\[0-9]+) screen(s) on the (+w) carousel$/, async (directions, screens, carousel) => {
    await scroll(direction, screens, carousel);
});

Then(/^I should see a new offers$/, async (message) => {
    await scroll(direction, screens, section);
});
