import * as cst from './consts.js';
import * as sel from './lib/selection-manager.js';
let hadInitialized = false;
function main() {
    if (!hadInitialized) {
        hadInitialized = true;
        sel.initSelectionManagement();
        document.body.appendChild(cst.contentWrap);
    }
}
main();
