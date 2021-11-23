import * as cst from './consts.js';
import initHighlight from './interface/select/s-highlight.js';
import initWidgets from './interface/widgets.js';
import Writable from './lib/writables.js';
let hadInitialized = false;
function main() {
    if (!hadInitialized) {
        hadInitialized = true;
        new Writable('select-element');
        new Writable('scale-ratio', window.devicePixelRatio);
        initHighlight();
        initWidgets();
        document.body.append(cst.contentWrap);
    }
}
main();
