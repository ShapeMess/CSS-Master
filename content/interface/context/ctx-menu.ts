
import * as cst from '../../consts.js';
import * as doc from '../../lib/doc.js';
import Writable from '../../lib/writables.js';

type HTElem = HTMLElement;
type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;

const selectElem = new Writable('select-element');
const scaleRatio = new Writable('scale-ratio');

let temp = {
    select: null as HTMLElement
}

let context = {
    wrap: null as Div,
    handle: null as Div,
    list: null as Div,
    
    tag: null as Span,
    id: null as Span,
    cls: null as Span,

    select: null as P,
    delete: null as P,
    clearCss: null as P,
    clearTransform: null as P
}

const hide = () => context.wrap.style.display = 'none';

function init() {

    context.wrap = doc.createHTML({
        tag: 'div',
        attr: { className: 'ctx', 'tab-index': '-1' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'handle' },
                use: (el: Div) => context.handle = el,
                nodes: [
                    { tag: 'span', attr: { className: 'tag' }, use: el => context.tag = el },
                    { tag: 'span', attr: { className: 'id'  }, use: el => context.id = el  },
                    { tag: 'span', attr: { className: 'cls' }, use: el => context.cls = el },
                    { tag: 'div',  attr: { className: 'shadow' } }
                ]
            },
            {
                tag: 'div',
                attr: { className: 'content' },
                use: (el: Div) => context.list = el,
                nodes: [
                    {
                        tag: 'p',
                        attr: { className: 'option', title: 'Add the element to currently active group\nfor styling.'},
                        nodes: ['Add to group'],
                        use: (el: P) => context.select = el,
                        evt: {
                            click: () => { selectElem.set(temp.select); hide() }
                        }
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option dbl', title: 'Delete element completely.\n(double-click)'},
                        nodes: ['Delete'],
                        use: (el: P) => context.delete = el,
                        evt: {
                            dblclick: () => { doc.$(temp.select).delete(); hide() }
                        }
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option dbl', title: 'Quickly remove all inline CSS.\n* Does not contribute to generated CSS.\n(double-click)'},
                        nodes: ['Clear inline CSS'],
                        use: (el: P) => context.clearCss = el,
                        evt: {
                            dblclick: () => { doc.$(temp.select).clearInlineCss(); hide() }
                        }
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option', title: 'Copy all changed CSS properties to the\nclipboard for use in source code.'},
                        nodes: ['Copy virtual CSS'],
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option dbl', title: 'Quickly remove all element transforms.\n* Does not contribute to generated CSS.\n(double-click)'},
                        nodes: ['Remove transforms'],
                        use: (el: P) => context.clearTransform = el,
                        evt: {
                            dblclick: () => { doc.$(temp.select).removeCssProperty('transform'); hide() }
                        }
                    }
                ]
            }
        ]
    }) as Div;

    doc.makeDraggable(context.wrap, context.handle);
    cst.contentWrap.append(context.wrap);

    document.addEventListener('contextmenu', e => {
        if (e.altKey && !doc.$(e.target as HTElem).areUIParts()) {
            e.preventDefault();
            const el = e.target as HTMLElement;
            temp.select = el;

            
            context.tag.textContent = el.tagName;
            context.id.textContent = el.id.length > 0 ? `#${el.id}` : '';
            context.cls.textContent = el.classList.length > 0 ? `.${el.classList.toString().split(' ').join('.')}` : '';
            
            if (cst.selectDisableTags.map(x => x.toUpperCase()).includes(el.tagName)) doc.$(context.delete).addClass('disabled');
            else doc.$(context.delete).removeClass('disabled');

            context.wrap.style.display = 'block';

            const x = e.clientX, y = e.clientY;
            const rect = context.wrap.getBoundingClientRect();

            if (x + rect.width > window.innerWidth) context.wrap.style.left = `${(window.innerWidth - rect.width)}px`;
            else                                    context.wrap.style.left = `${x}px`;

            if (y + rect.height > window.innerHeight) context.wrap.style.top = `${window.innerHeight - rect.height}px`;
            else                                      context.wrap.style.top = `${y}px`;
        }
    });

    document.addEventListener('click', (e) => {
        if (!Object.values(context).includes(e.target as HTMLElement)) context.wrap.style.display = 'none';
    });

    context.wrap.style.transform = `scale(${1 / window.devicePixelRatio})`;

    scaleRatio.subscribe((value) => {
        context.wrap.style.transform = `scale(${value})`;
        context.wrap.style.display = 'none';
    });
}

export default {
    init
};