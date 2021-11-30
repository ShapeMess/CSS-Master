
/**
 * Element `[0]` describes the namespace, eg. `http://www.w3.org/2000/svg`.
 * Element `[1]` contains the attribute value.
 */
type NSAttrArrayValue = [ string, string ];

export interface HTMLJsonMarkup {
    /**
     * Element tagName.
     */
    tag?: string
    /**
     * Namespace - use custom namespace if provided.
     */
    ns?: string
    /**
     * Object containing attributes to be physically added to the element using `setAttribute`.
     */
    attr?: { [key: string]: boolean|string|NSAttrArrayValue }
    /**
     * Specifies event callbacks for the element.
     */
    evt?:  { [key: string]: { (e: Event): any } }
    /**
     * A list of element child nodes, which could be strings, elements or another JSON template.
     */
    nodes?: (string|Node|HTMLElement|HTMLJsonMarkup)[]
    /**
     * A function that gets called after the element is completely generated. Useful for assigning that element to a variable.
     */
    use?(element: HTMLElement): void
    
    /**
     * Used to extend custom JSON templates. Used to clean up the code.
     */
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