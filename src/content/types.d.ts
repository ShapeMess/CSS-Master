
/**
 * First attribute declares the namesspace used while the second one is the value.
 */
type NSAttrArrayValue = [ string, string ];

export interface HTMLJsonMarkup {
    tag?: string
    ns?: string
    attr?: { [key: string]: boolean|string|NSAttrArrayValue }
    evt?:  { [key: string]: { (e: Event): any } }
    nodes?: (string|Node|HTMLElement|HTMLJsonMarkup)[]
    use?(element: HTMLElement): void
    
    $extend?: HTMLJsonMarkupExtendable
}

export interface HTMLJsonMarkupExtendable {
    tag?: string
    ns?: string
    attr?: { [key: string]: string|NSAttrArrayValue }
    evt?:  { [key: string]: Function }
    nodes?: (string|HTMLJsonMarkup)[]
    use?(element: HTMLElement): void
}

export interface QueryTools {  
    selection: HTMLElement[] | NodeListOf<Element>
    addClass(name: string): QueryTools
    removeClass(name: string): QueryTools
}

interface Select {
    target: HTMLElement;
}