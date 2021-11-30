
import * as cst from './consts.js';

import * as highlighter from './interface/select/selection-highlighting.js';
import initWidgets from './interface/widgets.js';
import Writable from './lib/writables.js';


let hadInitialized = false;

function main () {
    if (!hadInitialized) {
        
        hadInitialized = true;
        new Writable('select-element');

        highlighter.init();
        initWidgets();

        document.body.append(cst.contentWrap);
    }
}
 
main();

