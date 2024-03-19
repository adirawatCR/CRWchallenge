// break up the cashrewards.ts file and place the compare function here an make it generic
import {driver,browser,$,$$} from '@wdio/globals';

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