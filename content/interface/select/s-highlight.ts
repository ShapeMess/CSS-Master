
import * as cst from '../../consts.js';
import * as doc from '../../lib/doc.js';

type Span = HTMLSpanElement;
type Div = HTMLDivElement;
type HTElem = HTMLElement;

function init() {

    const box = {
        m: doc.createHTML({ tag: 'div', attr: { className: 'gbox-margin' } }),
        b: doc.createHTML({ tag: 'div', attr: { className: 'gbox-body' } }),
        p: doc.createHTML({ 
            tag: 'div', 
            attr: { className: 'gbox-entire-box' },
            nodes: [
                { tag: 'div', attr: { className: 'corner tl' } },
                { tag: 'div', attr: { className: 'corner tr' } },
                { tag: 'div', attr: { className: 'corner bl' } },
                { tag: 'div', attr: { className: 'corner br' } },
            ]
        }),
    }
    const line = {
        left:   doc.createHTML({ tag: 'div', attr: { className: 'gline v' } }),
        right:  doc.createHTML({ tag: 'div', attr: { className: 'gline v' } }),
        top:    doc.createHTML({ tag: 'div', attr: { className: 'gline h' } }),
        bottom: doc.createHTML({ tag: 'div', attr: { className: 'gline h' } }),
    }

    let info = {
        wrap: null as Div,
        tag: null as Span,
        id: null as Span,
        cls: null as Span,
        toggle: null as Div,
    };
    info.wrap = doc.createHTML({
        tag: 'div',
        attr: { className: 'elem-info' },
        nodes: [
            {
                tag: 'div',
                attr: { className: 'info-toggle' },
                use: (el: Div) => info.toggle = el,
                evt: { click: () => {
                    doc.$(info.wrap).toggleClass('toggle')
                }}
            },
            {
                tag: 'span',
                attr: { className: 'tag' },
                use: el => info.tag = el
            },
            {
                tag: 'span',
                attr: { className: 'id' },
                use: el => info.id = el
            },
            {
                tag: 'span',
                attr: { className: 'class' },
                use: el => info.cls = el
            },
        ]
    }) as Div;

    cst.contentWrap.append(box.m);
    cst.contentWrap.append(box.p);
    cst.contentWrap.append(box.b);
    cst.contentWrap.append(line.left);
    cst.contentWrap.append(line.right);
    cst.contentWrap.append(line.top);
    cst.contentWrap.append(line.bottom);
    cst.contentWrap.append(info.wrap);

    let select = {
        object: null as HTElem
    }

    document.addEventListener('mouseover', (e) => {
        const el = e.target as HTElem;
        if (!doc.$(el).areUIParts() && !cst.selectDisableTags.includes(el.tagName)) {
            select.object = el;
            info.tag.textContent = el.tagName;
            info.id.textContent = el.id.length > 0 ? `#${el.id}` : '';
            info.cls.textContent = el.classList.length > 0 ? `.${el.classList.toString().split(' ').join('.')}` : '';
        }
    });

    const setPaddingPosition = (box: HTElem, tRect: DOMRect, padding: number[]) => {
        box.style.width =   `${tRect.width}px`;
        box.style.height =  `${tRect.height}px`;
        box.style.left =    `${tRect.left}px`;
        box.style.top =     `${tRect.top}px`;
        
        line.left.style.left =  `${tRect.left}px`;
        line.right.style.left = `${tRect.left + tRect.width - 1}px`;
        line.top.style.top =    `${tRect.top}px`;
        line.bottom.style.top = `${tRect.top + tRect.height - 1}px`;

    }
    const setMarginPosition = (box: HTElem, tRect: DOMRect, margin: number[]) => {
        // -2px height/width to account for borders
        box.style.width =   `${tRect.width + margin[1] + margin[3] - 2}px`;
        box.style.height =  `${tRect.height + margin[0] + margin[2] - 2}px`;
        box.style.left =    `${tRect.left - margin[3]}px`;
        box.style.top =     `${tRect.top - margin[0]}px`;
    }
    const setBodyPosition = (box: HTElem, tRect: DOMRect, padding: number[]) => {
        // -2px height/width to account for borders
        box.style.width =   `${tRect.width - padding[1] - padding[3] - 2}px`;
        box.style.height =  `${tRect.height - padding[0] - padding[2] - 2}px`;
        box.style.left =    `${tRect.left + padding[3]}px`;
        box.style.top =     `${tRect.top + padding[0]}px`;
    }


    function trackFrame() {
        if (select.object) {
            const rect = select.object.getBoundingClientRect();
            const css = window.getComputedStyle(select.object);

            let padding = css.padding.replace(/px/g, '').split(' ').map(el => parseFloat(el));
            if (padding.length < 4) padding = [...padding, ...new Array(4 - padding.length).fill(0)]; 

            let margin = css.margin.replace(/px/g, '').split(' ').map(el => parseFloat(el));
            if (margin.length < 4) margin = [...margin, ...new Array(4 - margin.length).fill(0)];

            setBodyPosition(box.b, rect, padding);
            setMarginPosition(box.m, rect, margin);
            setPaddingPosition(box.p, rect, padding);

        }
        requestAnimationFrame(trackFrame);
    }
    trackFrame();


}

export default init;
