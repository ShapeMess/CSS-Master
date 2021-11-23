
import Writable from '../../lib/writables.js';
import * as doc from '../../lib/doc.js';
import * as cst from '../../consts.js';
import * as core from '../core/core.js';

import type * as T from '../../types.d';

type Html = HTMLElement;
type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;
type Preset = T.HTMLJsonMarkupExtendable;


const preset = {
    svgIco: {
        tag: 'svg',
        ns: 'http://www.w3.org/2000/svg',
        attr: { width: '16', height: '16', viewBox: '0 0 16 16' }
    } as Preset,
    svgPath: {
        tag: 'path',
        ns: 'http://www.w3.org/2000/svg'
    } as Preset,
    getSvgTitle: (title: string): Preset => ({
        tag: 'title',
        ns: 'http://www.w3.org/2000/svg',
        nodes: [title]
    })
}

function init() {

    const selectElem = new Writable('select-element');
    const scaleRatio = new Writable('scale-ratio');

    let elems = {
        handle: null as Div,
        list: null as Div,
        newGroup: null as Html
    }

    const menuElement = doc.createHTML({
        tag: 'div',
        attr: { className: 'group-manage' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'handle' },
                use: (el: Div) => elems.handle = el,
                nodes: [
                    {
                        tag: 'div',
                        attr: { className: 'btn-ball hide', title: 'Change widget opacity' },
                        evt: { click: () => doc.$(menuElement).toggleClass('opacity') }
                    }
                ]
            },
            {
                tag: 'div',
                attr: { className: 'ctrl-main' },
                nodes: [
                    {
                        $extend: preset.svgIco,
                        use: (el: HTMLElement) => elems.newGroup = el,
                        nodes: [
                            { $extend: preset.svgPath, attr: { d: "M 7 1 L 7 7 L 1 7 L 1 9 L 7 9 L 7 15 L 9 15 L 9 9 L 15 9 L 15 7 L 9 7 L 9 1 L 7 1 z" } },
                            { $extend: preset.getSvgTitle('New group') }
                        ]
                    }
                ]
            },
            {
                tag: 'div',
                attr: { className: 'list' },
                use: (el: Div) => elems.list = el,
            }
        ]
    });

    elems.newGroup.addEventListener('click', () => {
        const group = new core.ElementStylingGroup();
        elems.list.appendChild(group.uiElement);
    })







    doc.makeDraggable(menuElement, elems.handle);
    cst.contentWrap.append(menuElement);

    window.addEventListener('resize', () => {
        const rect = menuElement.getBoundingClientRect();
        if (rect.right > window.innerWidth) menuElement.style.left = `${window.innerWidth - rect.width}px`;
        if (rect.bottom > window.innerHeight) menuElement.style.top = `${window.innerHeight - rect.height}px`;
        if (rect.left < 0) menuElement.style.left = `0px`;
        if (rect.top < 0) menuElement.style.top = `0px`;
    });



}

export default {
    init
}