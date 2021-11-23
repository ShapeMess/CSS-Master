
import * as cst from '../consts.js';
import * as T from '../types.d';

const getAll = (query: string) => document.querySelectorAll(`${cst.prefix}${query}`);
const get = (query: string) => document.querySelector(`${cst.prefix}${query}`);

const isDOM = (o: any) => 
    typeof HTMLElement === "object" ? 
    o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";

const isUiPart = (el: any) => {
    if (!isDOM(el)) return false;
    else return el.classList.contains(cst.prefix);
}
const isArray = Array.isArray;

let rootObject = {
    selection: null as (HTMLElement)[]|NodeListOf<Element>
}

function root (query: string|HTMLElement): typeof root {
    if (isDOM(query)) rootObject.selection = [query as HTMLElement];
    else              rootObject.selection = document.querySelectorAll(query as string);
    return root;
}

root.items = () => rootObject.selection;

root.addClass = (string: string) => {
    rootObject.selection.forEach(elem => elem.classList.add(`${cst.prefix}${string}`));
    return root;
}
root.removeClass = (string: string) => {
    rootObject.selection.forEach(elem => elem.classList.remove(`${cst.prefix}${string}`));
    return root;
}
root.toggleClass = (string: string) => {
    rootObject.selection.forEach(elem => elem.classList.toggle(`${cst.prefix}${string}`));
    return root;
}
root.areDOM = () => {
    for (let i = 0; i < rootObject.selection.length; i++) if(!isDOM(rootObject.selection[i])) return false;
    return true;
}
root.areUIParts = () => {
    for (let i = 0; i < rootObject.selection.length; i++) if (!isUiPart(rootObject.selection[i])) return false;
    return true;
}
root.desync = (callback: Function) => {
    setTimeout(callback, 0);
    return root;
}
root.delete = () => {
    rootObject.selection.forEach((elem: HTMLElement) => elem.parentNode.removeChild(elem));
    return root;
}
root.clearInlineCss = () => {
    rootObject.selection.forEach((elem: HTMLElement) => elem.removeAttribute('style'));
    return root;
}
root.removeCssProperty = (property: string) => {
    rootObject.selection.forEach((elem: HTMLElement) => elem.style.removeProperty(property));
    return root;
}
root.style = (property: string, value: string) => {
    rootObject.selection.forEach((elem: HTMLElement) => elem.style[property] = value);
    return root;
}
root.on = (event: string, callback: { (e: Event): void }) => {
    rootObject.selection.forEach((elem: HTMLElement) => elem.addEventListener(event, callback));
    return root;
}


globalThis.root = root;


function createHTML(d: T.HTMLJsonMarkup) {

    // Extend object
    if (d.$extend) {
        if (d.$extend.tag && !d.tag)     d.tag =    d.$extend.tag;
        if (d.$extend.ns)                d.ns =     d.$extend.ns;
        if (d.$extend.evt)               d.evt =    {...d.$extend.evt,  ...d.evt} as any;
        if (d.$extend.attr)              d.attr =   {...d.$extend.attr, ...d.attr};
        if (d.$extend.use && !d.use)     d.use =    d.$extend.use;
        if (d.$extend.nodes && !d.nodes) d.nodes =  d.$extend.nodes;
    }

    const t = d.ns ?
        document.createElementNS(d.ns, d.tag) as HTMLElement :
        document.createElement(d.tag)

    // default class used for distinguishing widgets from the content
    t.classList.add(cst.prefix);

    for (const key in d.attr) {
        if (Object.prototype.hasOwnProperty.call(d.attr, key)) {
            if (key === 'id' && !isArray(key)) t.setAttribute(key, `${cst.prefix}${d.attr[key]}`);
            else if ((key === 'class' || key === 'className') && !isArray(key)) (d.attr[key] as string).split(' ').forEach(word => t.classList.add(`${cst.prefix}${word}`));
            else {
                if (Array.isArray(d.attr[key])) t.setAttributeNS(d.attr[key][0], key, d.attr[key][1]);
                else t.setAttribute(key, d.attr[key] as string);
            }
        }
    }

    for (const key in d.evt) {
        if (Object.prototype.hasOwnProperty.call(d.evt, key)) {
            const event = key.toLowerCase();
            const callback = d.evt[key];
            t.addEventListener(event, (e) => callback(e));
        }
    }

    if (d.nodes) d.nodes.forEach(node => {
        if (isDOM(node))                                                t.appendChild(node as HTMLElement);
        else if (typeof node === 'string')                              t.append(node as string);
        else if (Object.prototype.hasOwnProperty.call(node, 'tag'))     t.appendChild(createHTML(node as T.HTMLJsonMarkup));
        else if (Object.prototype.hasOwnProperty.call(node, '$extend')) t.appendChild(createHTML(node as T.HTMLJsonMarkup));
    });

    if (d.use) d.use(t);

    return t;
}
function makeDraggable(elem: HTMLElement, dragHeader: HTMLDivElement) {
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


export { 
    createHTML, 
    makeDraggable,
    
    root as $
}