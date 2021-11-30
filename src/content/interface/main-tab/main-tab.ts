
import * as doc from '../../lib/doc.js';
import * as cst from '../../consts.js';

import type * as T from '../../types.d';

type Html = HTMLElement;
type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;
type Preset = T.HTMLJsonMarkupExtendable;

let elems = {
    main: null as Div,
    handle: null as Div
}

function init() {

    elems.main = doc.createHTML({
        tag: 'div',
        attr: { className: 'main-tab' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'handle' },
                use: (el: Div) => elems.handle = el,
                nodes: [
                    {
                        tag: 'div',
                        attr: { className: 'btn-ball hide', title: 'Change widget opacity' },
                        evt: { click: () => doc.$(elems.main).toggleClass('opacity') }
                    },
                    {
                        tag: 'p',
                        nodes: ['Element settings']
                    }
                ]
            },
            {
                tag: 'div',
                attr: { className: 'upper-grid' },
                nodes: [
                    {
                        tag: 'div',
                        attr: { className: 'sidebar' },
                    } 
                ]
            } 
        ]
    }) as Div;

    doc.makeDraggable(elems.main, elems.handle);
    cst.contentWrap.append(elems.main);
    
} 




export default {
    init 
}