

export interface GroupHighlighterObject { target: HTMLElement, highlighter: HTMLElement }


// CSS Units
export type UnitAbs = 'cm'|'mm'|'in'|'px'|'pd'|'pc';
export type UnitRel = 'em'|'ex'|'ch'|'rem'|'vw'|'vh'|'vmin'|'vmax'|'%';
export type Unit = UnitAbs|UnitRel;

export type KeyUnitPair = [number, Unit];
export type KeyUnitPairList = [KeyUnitPair, KeyUnitPair, KeyUnitPair, KeyUnitPair];

// Possible changes on a CSS interface
export interface ESG_Changes {
    // Positioning and sizing
    // [top, right, bottom, left]
    margin?: KeyUnitPairList
    padding?: KeyUnitPairList
}