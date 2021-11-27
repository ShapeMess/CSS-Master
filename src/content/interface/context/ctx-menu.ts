
import Writable from '../../lib/writables.js';
import * as cst from '../../consts.js';
import * as doc from '../../lib/doc.js';
import * as Core from '../core/core.js';
import * as highlight from '../select/selection-highlighting.js';

type Html = HTMLElement;
type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;

const selectElem = new Writable('select-element');
const currentGroup = new Writable('current-group');
const gList = new Writable('group-list');

let temp = {
    select: null as HTMLElement
}

let context = {
    wrap: null as Div,
    handle: null as Div,
    list: null as Div,

    elInfWrap: null as Div,
    
    tag: null as Span,
    id: null as Span,
    cls: null as Span,

    addToGroup: null as P,
    addToNewGroup: null as P,
    delete: null as P,
    clearCss: null as P,
    clearTransform: null as P
}

const hide = () => context.wrap.style.display = 'none';
const isUI = (e: MouseEvent) => doc.$(e.target as Html).areUIParts();

function init() {

    /**
     * Adds an element to the current group (creates a new one if none are present).
     */
    function addtoGroup() {
        if ((Object.keys(Core.getGroups()).length === 0)) {
            const group = new Core.ElementStylingGroup();
            gList.value.appendChild(group.uiElement);
            group.addTarget(temp.select);
            group.select(); 
        }
        Core.addToGroup(currentGroup.value, temp.select); hide()
    }

    /**
     * Adds an element to a new group.
     */
    function addToNewGroup() {
        const group = new Core.ElementStylingGroup();
        gList.value.appendChild(group.uiElement);
        group.addTarget(temp.select);
        group.select(); 
        hide();
    }

    /**
     * Removes the element from the page.
     */
    function deleteElement() {
        const elGroup = temp.select.getAttribute(cst.cssGroupAttr);
        if (elGroup !== null) Core.removeFromGroup(elGroup, temp.select);
        doc.$(temp.select).delete(); 
        hide(); 
    }

    /**
     * Highlights all elements in the given group.
     */
    function highlightGroupTargets(id: string) {
        const group = Core.getGroup(id);
        if (group) {
            
        }
    }


    context.wrap = doc.createHTML({
        tag: 'div',
        attr: { className: 'ctx', 'tab-index': '-1' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'handle' },
                use: (el: Div) => context.handle = el,
                nodes: [{
                    tag: 'div',
                    attr: { className: 'el-info-wrap' },
                    use: (el: Div) => context.elInfWrap = el,
                    nodes: [
                        { tag: 'span', attr: { className: 'tag' }, use: el => context.tag = el },
                        { tag: 'span', attr: { className: 'id'  }, use: el => context.id = el  },
                        { tag: 'span', attr: { className: 'cls' }, use: el => context.cls = el },
                        { tag: 'div',  attr: { className: 'shadow' } }
                    ]
                }]
            },
            {
                tag: 'div',
                attr: { className: 'content' },
                use: (el: Div) => context.list = el,
                nodes: [
                    {
                        tag: 'p',
                        attr: { className: 'option', title: 'Add the element to the currently active group.'},
                        nodes: ['Add', { tag: 'span', nodes: ['Ctrl + Click'] }],
                        use: (el: P) => context.addToGroup = el,
                        evt: {
                            click: addtoGroup
                        }
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option dbl', title: 'Delete element completely.\n(double-click)'},
                        nodes: ['Delete'],
                        use: (el: P) => context.delete = el,
                        evt: {
                            dblclick: deleteElement
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
                    },
                    {
                        tag: 'p',
                        attr: { className: 'option', title: 'Select this element and add it to an entirely new group.'},
                        nodes: ['Add to new group', { tag: 'span', nodes: ['Ctrl + Alt + Click'] }],
                        use: (el: P) => context.addToNewGroup = el,
                        evt: {
                            click: addToNewGroup
                        }
                    }
                ]
            }
        ]
    }) as Div;

    doc.makeDraggable(context.wrap, context.handle);
    cst.contentWrap.append(context.wrap);

    /**
     * Shows the contextmenu and positions it accordingly.
     * @param e MouseEvent
     */
    function openCTX(e: MouseEvent) {
        if (e.altKey && !doc.$(e.target as Html).areUIParts()) {
            e.preventDefault();
            const el = e.target as HTMLElement;
            temp.select = el;

            // Getting attributes + generating title
            const elInfo = doc.getElementInfo(el);
            
            context.tag.textContent = el.tagName;
            context.id.textContent = elInfo.id;
            context.cls.textContent = elInfo.classes;
            context.handle.title = elInfo.title;


            if (cst.selectionDisabledTags.map(x => x.toUpperCase()).includes(el.tagName)) doc.$(context.delete).addClass('disabled');
            else doc.$(context.delete).removeClass('disabled');

            context.wrap.style.display = 'block';

            const x = e.clientX, y = e.clientY;
            const rect = context.wrap.getBoundingClientRect();

            if (x + rect.width > window.innerWidth) context.wrap.style.left = `${(window.innerWidth - rect.width)}px`;
            else                                    context.wrap.style.left = `${x}px`;

            if (y + rect.height > window.innerHeight) context.wrap.style.top = `${window.innerHeight - rect.height}px`;
            else                                      context.wrap.style.top = `${y}px`;
        }
    }

    /**
     * Attempts to close the contextmenu if `e.target` isn't a member of the `context` object.
     * @param e MouseEvent
     */
    function attemptCloseCTX(e: MouseEvent) {
        if (!Object.values(context).includes(e.target as HTMLElement)) context.wrap.style.display = 'none';
    }

    /**
     * Highlights the target element.
     */
    function highlightTarget() { 
        highlight.setTarget(temp.select);
    }


    const capture = {
        /**
         * Key shortcut for `add` from the contextmenu.
         * @param e MouseEvent
         */
        ctrlClick: (e: MouseEvent): boolean => {
            if (!isUI(e))
            if (e.ctrlKey) {
                temp.select = e.target as Html;
                addtoGroup();
                return true;
            }
            return false;
        },
        /**
         * Key shortcut for `add to new gtoup` from the contextmenu.
         * @param e MouseEvent
         */
        ctrlAltClick: (e: MouseEvent): boolean => {
            if (!isUI(e))
            if (e.ctrlKey && e.altKey) {
                temp.select = e.target as Html;
                addToNewGroup();
                return true;
            }
            return false;
        }
    }

    context.wrap.addEventListener('mouseover', highlightTarget);



    let keyDown = false;
    document.querySelector('html').addEventListener('keydown', e => {
        if (!keyDown && e.ctrlKey) {
            keyDown = true;
            doc.$(document.body).addClass(cst.cls.bodyCrosshair);
        }
    });
    document.querySelector('html').addEventListener('keyup', () => {
        keyDown = false;
        doc.$(document.body).removeClass(cst.cls.bodyCrosshair);
    });

               


    // Events called on actual page elements (get removed if the UI is to be hidden)
    document.addEventListener('contextmenu', openCTX);
    document.addEventListener('click', attemptCloseCTX);

    document.body.addEventListener('click', e => {
        if      (capture.ctrlAltClick(e)) return e.stopPropagation();
        else if (capture.ctrlClick(e)) return e.stopPropagation();
    });



}

export default {
    init
};



