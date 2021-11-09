import * as doc from '../lib/doc.js';
import * as cst from '../consts.js';
const hide = () => doc.t(contextMenu).removeClass('shown');
let target;
const setTarget = (el) => {
    target = el;
    btns.elemInfo.tag.textContent = el.tagName;
    btns.elemInfo.id.textContent = el.id.length > 0 ? `#${el.id}` : '';
    btns.elemInfo.class.textContent = el.classList.length > 0 ? `.${el.classList.toString().split(' ').join('.')}` : '';
    const entireStrig = `${el.tagName}${el.id.length > 0 ? `#${el.id}` : ''}${el.classList.length > 0 ? `.${el.classList.toString().split(' ').join('.')}` : ''}`;
    btns.elemInfo.wrap.setAttribute('title', entireStrig);
};
let btns = {
    elemInfo: {
        wrap: null,
        tag: null,
        id: null,
        class: null,
    },
    delete: null,
    rmInlineCss: null,
};
let evts = {
    remove: (elem) => {
        try {
            const tn = elem.tagName;
            if (tn === 'HTML' || tn === 'BODY')
                throw '';
            elem.parentElement.removeChild(elem);
        }
        catch (err) {
            console.warn(`${cst.logPrefix} Can't delete element "${elem.tagName}"`);
        }
    },
    rmInlineCss: (elem) => {
        elem.removeAttribute('style');
        elem.removeAttribute(cst.cssDatasetStorage);
    }
};
const contextMenu = doc.createHTML({
    tag: 'div',
    attr: { className: 'ctx-menu' },
    nodes: [
        {
            tag: 'div',
            attr: { className: 'elem-inf' },
            use: el => btns.elemInfo.wrap = el,
            nodes: [
                { tag: 'p', attr: { className: 'inf-sign tag' }, use: el => btns.elemInfo.tag = el },
                { tag: 'p', attr: { className: 'inf-sign id' }, use: el => btns.elemInfo.id = el },
                { tag: 'p', attr: { className: 'inf-sign class' }, use: el => btns.elemInfo.class = el }
            ]
        },
        {
            tag: 'div',
            attr: { class: 'option opt-default' },
            nodes: ['Delete'],
            use: el => btns.delete = el,
            evt: {
                click: () => {
                    evts.remove(target);
                    hide();
                }
            }
        },
        {
            tag: 'div',
            attr: { class: 'option opt-default' },
            nodes: ['Remove inline CSS'],
            use: el => btns.rmInlineCss = el,
            evt: {
                click: () => {
                    evts.rmInlineCss(target);
                    hide();
                }
            }
        }
    ]
});
export { contextMenu as menu, setTarget };
