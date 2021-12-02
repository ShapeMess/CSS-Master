
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
    
    /** Represents virtual CSS changes to margins. */
    set margin(x: Core.KeyUnitPairList) {
        x = x.map(x => css.normalizeKeyUnitPair(x)) as Core.KeyUnitPairList;
        this.changes.margin = x;
        this.repaint();
    }
    get margin() { return this.changes.margin }


    /** Represents virtual CSS changes to padding. */
    set padding(x: Core.KeyUnitPairList) {
        x = x.map(x => css.normalizeKeyUnitPair(x)) as Core.KeyUnitPairList;
        this.changes.padding = x;
        this.repaint();
    }
    get padding() { return this.changes.padding }


}

