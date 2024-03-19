// break up the cashrewards.ts file and place the visibleOffers function here and make it generic
import {driver,browser,$,$$} from '@wdio/globals';

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
