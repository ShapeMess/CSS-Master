
import * as cst from './consts.js';
import * as doc from './lib/doc.js';
import * as sel from './lib/selection-manager.js';
import * as ctx from './interface/context-menu.js';

let hadInitialized = false;

function main () {

    if (!hadInitialized) {
        hadInitialized = true;
        
        sel.initSelectionManagement();

        document.body.appendChild(cst.contentWrap);
    }
}

main();
