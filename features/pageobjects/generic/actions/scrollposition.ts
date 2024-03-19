// break up the cashrewards.ts file and place the screen size position based on a page element here and make it generic

import {driver,browser,$,$$} from '@wdio/globals';


// Current Scroll bar Positon in the Offers List Container
let scrollPosition = async (vRawList_xpath) => {
    type elemtype = any; // hack to shoosh ts
    let elements: elemtype = await $(vRawList_xpath);
    //let elements = await driver.findElement(driver.By.xpath(vRawList_xpath));
    return await driver.executeScript("return arguments[0].scrollLeft", elements);
    // could use scrollIntoView(element number x) as an alternative
}

