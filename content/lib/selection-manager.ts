
import * as cst from '../consts.js';
import * as doc from './doc.js';
import * as ctx from '../interface/context-menu.js';

import * as T from '../types.d';

let selected: T.Select = {
    target: null
}

const gline = {
    left:   doc.createHTML({ tag: 'div', attr: { className: 'gline v' } }),
    right:  doc.createHTML({ tag: 'div', attr: { className: 'gline v' } }),
    top:    doc.createHTML({ tag: 'div', attr: { className: 'gline h' } }),
    bottom: doc.createHTML({ tag: 'div', attr: { className: 'gline h' } }),

    margin:         doc.createHTML({ tag: 'div', attr: { className: 'gbox margin' } }),
    padding:        doc.createHTML({ tag: 'div', attr: { className: 'gbox padding' } }),
    margin_border:  doc.createHTML({ tag: 'div', attr: { className: 'gbox margin-border' } }),
    padding_border: doc.createHTML({ tag: 'div', attr: { className: 'gbox padding-border' } }),

    target: null as HTMLElement,
}


function main() {

    cst.contentWrap.appendChild(ctx.menu);
    
    cst.contentWrap.appendChild(gline.left);
    cst.contentWrap.appendChild(gline.right);
    cst.contentWrap.appendChild(gline.top);
    cst.contentWrap.appendChild(gline.bottom);
    
    cst.contentWrap.appendChild(gline.margin);
    cst.contentWrap.appendChild(gline.padding);
    cst.contentWrap.appendChild(gline.margin_border);
    cst.contentWrap.appendChild(gline.padding_border);

    // context menu
    document.addEventListener('contextmenu', e => {
        if (e.altKey && !(e.target as HTMLElement).classList.contains(cst.prefix)) {
            e.preventDefault();
            
            let x = e.clientX;
            let y = e.clientY;
            const c_rect = ctx.menu.getBoundingClientRect();

            if (x + c_rect.width > window.innerWidth) x -= c_rect.width; 
            if (y + c_rect.height > window.innerHeight) y -= c_rect.height; 

            ctx.menu.style.left = `${x}px`;
            ctx.menu.style.top = `${y}px`;

            ctx.setTarget(e.target as HTMLElement);
            doc.t(ctx.menu).addClass('shown');
        }
    });
    window.addEventListener('click', e => {
        if (!doc.isUiPart(e.target)) doc.t(ctx.menu).removeClass('shown');
    });
    document.body.addEventListener('mouseover', e => {
        gline.target = e.target as HTMLElement;
    });



    const setBoxPosition = (box: HTMLElement, tRect: DOMRect, styles: number[]) => {
        box.style.width = `${tRect.width + styles[1] + styles[3]}px`;
        box.style.height = `${tRect.height + styles[0] + styles[2]}px`;
        box.style.left = `${tRect.left - styles[3]}px`;
        box.style.top = `${tRect.top - styles[0]}px`;
    }

    const glineRefresh = () => {
        if (doc.isDOM(gline.target)) {
            if (!gline.target.classList.contains(cst.prefix)) {
                const tRect = gline.target.getBoundingClientRect();

                // guidelines
                gline.left.style.left =  `${tRect.left}px`;
                gline.right.style.left = `${tRect.left + tRect.width - 1}px`;
                gline.top.style.top =    `${tRect.top}px`;
                gline.bottom.style.top = `${tRect.top + tRect.height - 1}px`;

                // boxes
                const tStyle = window.getComputedStyle(gline.target);
                let padding = tStyle.padding.replace(/px/g, '').split(' ').map(el => parseFloat(el));
                if (padding.length < 4) padding = [...padding, ...new Array(4 - padding.length).fill(0)]; // make sure all 4 padding values are present
                
                let margin = tStyle.margin.replace(/px/g, '').split(' ').map(el => parseFloat(el));
                if (margin.length < 4) margin = [...margin, ...new Array(4 - margin.length).fill(0)]; // make sure all 4 margin values are present
                
                setBoxPosition(gline.padding,        tRect, padding);
                setBoxPosition(gline.padding_border, tRect, padding);
                setBoxPosition(gline.margin,         tRect, margin);
                setBoxPosition(gline.margin_border,  tRect, margin);

            }
        }
        requestAnimationFrame(glineRefresh);
    }
    glineRefresh();

}
 
export {
    main as initSelectionManagement,
    gline
};