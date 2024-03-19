// break up the cashrewards.ts file and place the screen size function and make it generic
import {driver,browser,$,$$} from '@wdio/globals';

// Returns Offer Container screen width for scrolling calculation
const screenWidth = async (vRawList_xpath) => {
    let elementScreenWidth = await $(vRawList_xpath);
    return await elementScreenWidth.getSize('width');
}

