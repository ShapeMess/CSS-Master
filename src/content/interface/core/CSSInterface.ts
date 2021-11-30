
import type * as T from '../../types';
import type * as Core from './core.types';

import * as css from './CSSHelperMethods.js';

type Html = HTMLElement;
type Span = HTMLSpanElement;
type Input = HTMLInputElement;
type Div = HTMLDivElement;
type P = HTMLParagraphElement;
type Preset = T.HTMLJsonMarkupExtendable; 



export default class CSSInterface {

    public targets: Html[] = [];
    public changes: Core.ESG_Changes = {};
    public onRepaint(callback: { (changes: Core.ESG_Changes): void }) { this.repaintHandlers.push(callback); }

    private repaintHandlers: Function[] = [];
    private repaint() { this.repaintHandlers.forEach(x => x()); }

    constructor() {}
    
    set margin(x: Core.KeyUnitPairList) {
        x.map(x => css.normalizeKeyUnitPair(x));
        this.changes.margin = x;
        this.repaint();
    }
    get margin() { return this.changes.margin }


    set padding(x: Core.KeyUnitPairList) {
        x.map(x => css.normalizeKeyUnitPair(x));
        this.changes.padding = x;
        this.repaint();
    }
    get padding() { return this.changes.padding }


}

