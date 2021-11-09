

export interface HTMLJsonMarkup {
    tag: string,
    attr?: { [key: string]: string },
    evt?:  { [key: string]: Function },
    nodes?: (string|Node|HTMLElement|HTMLJsonMarkup)[]
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