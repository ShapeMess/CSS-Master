import * as cst from '../consts.js';
// Peripherals
const isDOM = (o) => typeof HTMLElement === "object" ?
    o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
const isUiPart = (el) => {
    if (!isDOM(el))
        return false;
    else
        return el.classList.contains(cst.prefix);
};
const query = (query) => document.querySelector(`${cst.prefix}${query}`);
const queryAll = (query) => document.querySelectorAll(`${cst.prefix}${query}`);
let queryTools = {
    selection: null,
    addClass: (string) => {
        queryTools.selection.forEach(elem => elem.classList.add(`${cst.prefix}${string}`));
        return queryTools;
    },
    removeClass: (string) => {
        queryTools.selection.forEach(elem => elem.classList.remove(`${cst.prefix}${string}`));
        return queryTools;
    }
};
function select(query) {
    if (isDOM(query))
        queryTools.selection = [query];
    else
        queryTools.selection = queryAll(query);
    return queryTools;
}
function createHTML(d) {
    const t = document.createElement(d.tag);
    // default class used for distinguishing widgets from the content
    t.classList.add(cst.prefix);
    for (const key in d.attr) {
        if (Object.prototype.hasOwnProperty.call(d.attr, key)) {
            if (key === 'id')
                t.setAttribute(key, `${cst.prefix}${d.attr[key]}`);
            else if (key === 'class' || key === 'className')
                d.attr[key].split(' ').forEach(word => t.classList.add(`${cst.prefix}${word}`));
            else
                t.setAttribute(key, d.attr[key]);
        }
    }
    for (const key in d.evt) {
        if (Object.prototype.hasOwnProperty.call(d.evt, key)) {
            const event = key.toLowerCase();
            const callback = d.evt[key];
            t.addEventListener(event, (e) => callback(e));
        }
    }
    if (d.nodes)
        d.nodes.forEach(node => {
            if (isDOM(node))
                t.appendChild(node);
            else if (typeof node === 'string')
                t.append(node);
            else if (Object.prototype.hasOwnProperty.call(node, 'tag'))
                t.appendChild(createHTML(node));
        });
    if (d.use)
        d.use(t);
    return t;
}
function makeDraggable(elem, dragHeader) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    dragHeader.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
export { createHTML, makeDraggable, query, queryAll, isUiPart, select as t, isDOM };
