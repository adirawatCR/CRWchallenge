import { $ } from '@wdio/globals'
import Site from '../../site.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class navigateTo extends Site {


    open () {
        return super.open('/');
    }
}

export default new navigateTo();
