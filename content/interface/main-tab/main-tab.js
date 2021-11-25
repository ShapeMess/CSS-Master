import * as doc from '../../lib/doc.js';
import * as cst from '../../consts.js';
let elems = {
    main: null,
    handle: null
};
function init() {
    elems.main = doc.createHTML({
        tag: 'div',
        attr: { className: 'main-tab' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'handle' },
                use: (el) => elems.handle = el,
            }
        ]
    });
    doc.makeDraggable(elems.main, elems.handle);
    cst.contentWrap.append(elems.main);
}
export default {
    init
};
