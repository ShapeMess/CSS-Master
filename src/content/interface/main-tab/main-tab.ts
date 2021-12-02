
import * as doc from '../../lib/doc.js';
import * as cst from '../../consts.js';
import * as Core from '../core/core.js';
import * as css from '../core/CSSHelperMethods.js';
import Writable from '../../lib/writables.js';

import type * as T from '../../types.d';
import type * as CT from '../core/core.types';

type Html = HTMLElement;
type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;
type Input = HTMLInputElement;
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
    }),
    units: {
        tag: 'datalist',
        nodes: [
            { tag: 'option', attr: { value: 'px' } },
            { tag: 'option', attr: { value: 'cm' } },
            { tag: 'option', attr: { value: 'mm' } },
            { tag: 'option', attr: { value: 'in' } },
            { tag: 'option', attr: { value: 'pd' } },
            { tag: 'option', attr: { value: 'pc' } },
            { tag: 'option', attr: { value: 'em' } },
            { tag: 'option', attr: { value: 'rem' } },
            { tag: 'option', attr: { value: 'ex' } },
            { tag: 'option', attr: { value: '%' } },
            { tag: 'option', attr: { value: 'ch' } },
            { tag: 'option', attr: { value: 'vw' } },
            { tag: 'option', attr: { value: 'vh' } },
            { tag: 'option', attr: { value: 'vmin' } },
            { tag: 'option', attr: { value: 'vmax' } },
        ]
    },

    clearInput: {
        evt: { mousedown: (e: MouseEvent) => {
            (e.target as Input).value = '';
        }}
    }
}

const currentGroup = new Writable('current-group');

let elems = {
    main: null as Div,
    handle: null as Div,
    content: null as Html,

    nav: {
        sizing: null as Html
    },
    page: {
        sizing: null as Html
    }
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
                        nodes: ['Element styles']
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
                        nodes: [
                            {
                                $extend: preset.svgIco,
                                use: el => elems.nav.sizing = el,
                                nodes: [{ $extend: preset.getSvgTitle('Element sizing')}, { $extend: preset.svgPath, attr: { d: 'M 2.5913461,0.78846166 A 1.8028846,1.8028846 0 0 0 0.78846156,2.5913464 1.8028846,1.8028846 0 0 0 2.140625,4.3343695 v 7.3330215 a 1.8028846,1.8028846 0 0 0 -1.35216344,1.741263 1.8028846,1.8028846 0 0 0 1.80288454,1.802885 1.8028846,1.8028846 0 0 0 1.7430233,-1.352163 h 7.3330216 a 1.8028846,1.8028846 0 0 0 1.741262,1.352163 1.8028846,1.8028846 0 0 0 1.802885,-1.802885 1.8028846,1.8028846 0 0 0 -1.352164,-1.744784 V 4.3343695 A 1.8028846,1.8028846 0 0 0 15.211538,2.5913464 1.8028846,1.8028846 0 0 0 13.408653,0.78846166 1.8028846,1.8028846 0 0 0 11.667391,2.1406252 H 4.3378906 A 1.8028846,1.8028846 0 0 0 2.5913461,0.78846166 Z m 0,0.67608184 A 1.1268029,1.1268029 0 0 1 3.718149,2.5913464 1.1268029,1.1268029 0 0 1 2.5913461,3.7181493 1.1268029,1.1268029 0 0 1 1.4645433,2.5913464 1.1268029,1.1268029 0 0 1 2.5913461,1.4645435 Z m 10.8173069,0 A 1.1268029,1.1268029 0 0 1 14.535456,2.5913464 1.1268029,1.1268029 0 0 1 13.408653,3.7181493 1.1268029,1.1268029 0 0 1 12.28185,2.5913464 1.1268029,1.1268029 0 0 1 13.408653,1.4645435 Z m -9.0742836,1.577524 h 7.3330216 a 1.8028846,1.8028846 0 0 0 1.290541,1.292302 v 7.3330215 a 1.8028846,1.8028846 0 0 0 -1.290541,1.290542 H 4.3378906 A 1.8028846,1.8028846 0 0 0 3.0420673,11.66387 V 4.3343695 A 1.8028846,1.8028846 0 0 0 4.3343694,3.0420675 Z M 2.5913461,12.281851 A 1.1268029,1.1268029 0 0 1 3.718149,13.408654 1.1268029,1.1268029 0 0 1 2.5913461,14.535457 1.1268029,1.1268029 0 0 1 1.4645433,13.408654 1.1268029,1.1268029 0 0 1 2.5913461,12.281851 Z m 10.8173069,0 a 1.1268029,1.1268029 0 0 1 1.126803,1.126803 1.1268029,1.1268029 0 0 1 -1.126803,1.126803 1.1268029,1.1268029 0 0 1 -1.126803,-1.126803 1.1268029,1.1268029 0 0 1 1.126803,-1.126803 z' } }]
                            }
                        ]
                    },
                    {
                        tag: 'div',
                        attr: { className: 'content' },
                        use: el => elems.content = el
                    } 
                ]
            } 
        ]
    }) as Div;

    doc.makeDraggable(elems.main, elems.handle);
    cst.contentWrap.append(elems.main);

    
    // Group
    // =====================================

    let g: Core.ElementStylingGroup;
    currentGroup.subscribe((id) => { 
        globalThis.g = g = Core.getGroup(id);
        g = Core.getGroup(id);
    });

    // Sizing
    // =====================================

    let sizingElems = {
        sizeLabel: null as P,

        margTop: null as P,
        margRight: null as P,
        margBottom: null as P,
        margLeft: null as P,
        padTop: null as P,
        padRight: null as P,
        padBottom: null as P,
        padLeft: null as P,

        iMargTop: null as Input,
        iMargRight: null as Input,
        iMargBottom: null as Input,
        iMargLeft: null as Input,
        iMargTopUnit: null as Input,
        iMargRightUnit: null as Input,
        iMargBottomUnit: null as Input,
        iMargLeftUnit: null as Input,

        iPadTop: null as Input,
        iPadRight: null as Input,
        iPadBottom: null as Input,
        iPadLeft: null as Input,
        iPadTopUnit: null as Input,
        iPadRightUnit: null as Input,
        iPadBottomUnit: null as Input,
        iPadLeftUnit: null as Input,
    }

    let _marg: CT.KeyUnitPairList = [[null, null], [null, null], [null, null], [null, null]];
    let _pad: CT.KeyUnitPairList = [[null, null], [null, null], [null, null], [null, null]];

    elems.page.sizing = doc.createHTML({
        tag: 'div', attr: { className: 'page pg-sizing' },
        nodes: [
            { tag: 'p', attr: { className: 'title' }, nodes: ['Padding / margin'] },
            {
                tag: 'div', attr: { className: 'st-pad-marg' },
                nodes: [
                    { tag: 'div', attr: { className: 'box-marg' } },
                    { tag: 'div', attr: { className: 'box-pad' } },
                    { tag: 'p', attr: { className: 'size-label' }, use: (el: P) => sizingElems.sizeLabel = el },

                    { tag: 'p', attr: { className: 'label-marg top' },      nodes: ['-'],   use: (el: P) => sizingElems.margTop = el },
                    { tag: 'p', attr: { className: 'label-marg right' },    nodes: ['-'],   use: (el: P) => sizingElems.margRight = el },
                    { tag: 'p', attr: { className: 'label-marg bottom' },   nodes: ['-'],   use: (el: P) => sizingElems.margBottom = el },
                    { tag: 'p', attr: { className: 'label-marg left' },     nodes: ['-'],   use: (el: P) => sizingElems.margLeft = el },
                    { tag: 'p', attr: { className: 'label-pad top' },       nodes: ['-'],   use: (el: P) => sizingElems.padTop = el },
                    { tag: 'p', attr: { className: 'label-pad right' },     nodes: ['-'],   use: (el: P) => sizingElems.padRight = el },
                    { tag: 'p', attr: { className: 'label-pad bottom' },    nodes: ['-'],   use: (el: P) => sizingElems.padBottom = el },
                    { tag: 'p', attr: { className: 'label-pad left' },      nodes: ['-'],   use: (el: P) => sizingElems.padLeft = el },
                ]
            }, 
            { tag: 'p', attr: { className: 'title-small' }, nodes: ['Margin'] },

            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Top:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iMargTop = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-0` }, use: (el: Input) => sizingElems.iMargTopUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-0' } }
            ]},
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Right:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iMargRight = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-0` }, use: (el: Input) => sizingElems.iMargRightUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-0' } }
            ]},
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Bottom:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iMargBottom = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-0` }, use: (el: Input) => sizingElems.iMargBottomUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-0' } }
            ]},
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Left:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iMargLeft = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-0` }, use: (el: Input) => sizingElems.iMargLeftUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-0' } }
            ]},

            { tag: 'p', attr: { className: 'title-small' }, nodes: ['Padding'] },

            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Top:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iPadTop = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-4` }, use: (el: Input) => sizingElems.iPadTopUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-4' } }
            ]},
            
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Right:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iPadRight = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-5` }, use: (el: Input) => sizingElems.iPadRightUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-5' } }
            ]},
            
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Bottom:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iPadBottom = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-6` }, use: (el: Input) => sizingElems.iPadBottomUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-6' } }
            ]},
            
            { tag: 'div', attr: { className: 'row' }, nodes: [
                { tag: 'p', nodes: ['Left:']}, 
                { tag: 'input', attr: { type: 'number' }, use: (el: Input) => sizingElems.iPadLeft = el }, 
                { tag: 'input', attr: { type: 'text', list: `${cst.prefix}dl-7` }, use: (el: Input) => sizingElems.iPadLeftUnit = el, $extend: preset.clearInput }, 
                { $extend: preset.units, attr: { id: 'dl-7' } }
            ]}
        ]
    });
    elems.content.appendChild(elems.page.sizing);

    (function() {
        doc.$(sizingElems.iMargTop).on(['input', 'change'], (e) => {
            if (g) {
                _marg[0][0] = parseInt(sizingElems.iMargTop.value);
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargRight).on(['input', 'change'], (e) => {
            if (g) {
                _marg[1][0] = parseInt(sizingElems.iMargRight.value);
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargBottom).on(['input', 'change'], (e) => {
            if (g) {
                _marg[2][0] = parseInt(sizingElems.iMargBottom.value);
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargLeft).on(['input', 'change'], (e) => {
            if (g) {
                _marg[3][0] = parseInt(sizingElems.iMargLeft.value);
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargTopUnit).on(['input', 'change'], (e) => {
            if (g) {
                _marg[0][1] = sizingElems.iMargTopUnit.value as CT.Unit;
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargRightUnit).on(['input', 'change'], (e) => {
            if (g) {
                _marg[1][1] = sizingElems.iMargRightUnit.value as CT.Unit;
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargBottomUnit).on(['input', 'change'], (e) => {
            if (g) {
                _marg[2][1] = sizingElems.iMargBottomUnit.value as CT.Unit;
                g.margin = _marg;
            }
        });
        doc.$(sizingElems.iMargLeftUnit).on(['input', 'change'], (e) => {
            if (g) {
                _marg[3][1] = sizingElems.iMargLeftUnit.value as CT.Unit;
                g.margin = _marg;
            }
        });
        
        doc.$(sizingElems.iPadTop).on(['input', 'change'], (e) => {
            if (g) {
                _pad[0][0] = parseInt(sizingElems.iPadTop.value);
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadRight).on(['input', 'change'], (e) => {
            if (g) {
                _pad[1][0] = parseInt(sizingElems.iPadRight.value);
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadBottom).on(['input', 'change'], (e) => {
            if (g) {
                _pad[2][0] = parseInt(sizingElems.iPadBottom.value);
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadLeft).on(['input', 'change'], (e) => {
            if (g) {
                _pad[3][0] = parseInt(sizingElems.iPadLeft.value);
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadTopUnit).on(['input', 'change'], (e) => {
            if (g) {
                _pad[0][1] = sizingElems.iPadTopUnit.value as CT.Unit;
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadRightUnit).on(['input', 'change'], (e) => {
            if (g) {
                _pad[1][1] = sizingElems.iPadRightUnit.value as CT.Unit;
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadBottomUnit).on(['input', 'change'], (e) => {
            if (g) {
                _pad[2][1] = sizingElems.iPadBottomUnit.value as CT.Unit;
                g.padding = _pad;
            }
        });
        doc.$(sizingElems.iPadLeftUnit).on(['input', 'change'], (e) => {
            if (g) {
                _pad[3][1] = sizingElems.iPadLeftUnit.value as CT.Unit;
                g.padding = _pad;
            }
        });
    })();

    setInterval(() => {
        if (g) {
            const t0Rect = g.targets[0].getBoundingClientRect();
            const t0css = window.getComputedStyle(g.targets[0]);
            sizingElems.sizeLabel.textContent = `${t0Rect.width.toFixed(0)} x ${t0Rect.height.toFixed(0)}`;

            if (g.changes.margin) {
                let m = g.changes.margin;
                sizingElems.margTop.textContent =       m[0][0] ? `${m[0][0]} ${m[0][1]}`  : '-';
                sizingElems.margRight.textContent =     m[1][0] ? `${m[1][0]}\n${m[1][1]}` : '-';
                sizingElems.margBottom.textContent =    m[2][0] ? `${m[2][0]} ${m[2][1]}`  : '-';
                sizingElems.margLeft.textContent =      m[3][0] ? `${m[3][0]}\n${m[3][1]}` : '-';
            }
            if (g.changes.padding) {
                let p = g.changes.padding;
                sizingElems.padTop.textContent =       p[0][0] ? `${p[0][0]} ${p[0][1]}`  : '-';
                sizingElems.padRight.textContent =     p[1][0] ? `${p[1][0]}\n${p[1][1]}` : '-';
                sizingElems.padBottom.textContent =    p[2][0] ? `${p[2][0]} ${p[2][1]}`  : '-';
                sizingElems.padLeft.textContent =      p[3][0] ? `${p[3][0]}\n${p[3][1]}` : '-';
            }

        }
    }, cst.refreshRate);

    
} 




export default {
    init 
}