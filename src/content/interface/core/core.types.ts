

export interface GroupHighlighterObject { target: HTMLElement, highlighter: HTMLElement }


// CSS Units
export type SizeUnitAbs = 'cm'|'mm'|'in'|'px'|'pd'|'pc';
export type SizeUnitRel = 'em'|'ex'|'ch'|'rem'|'vw'|'vh'|'vmin'|'vmax'|'%';
export type SizeUnit = SizeUnitAbs|SizeUnitRel;

export type KeyUnitPair = [number, SizeUnit];

export type KeyUnitPairList = [KeyUnitPair, KeyUnitPair, KeyUnitPair, KeyUnitPair];

// Possible changes on a CSS interface
export interface ESG_Changes {
    // Positioning and sizing
    // [top, right, bottom, left]
    margin?: KeyUnitPairList
    padding?: KeyUnitPairList
}