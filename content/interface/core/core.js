import Writable from '../../lib/writables.js';
import * as doc from '../../lib/doc.js';
import * as cst from '../../consts.js';
import * as highlight from '../select/s-highlight.js';
/**
 * SVG icon presets
 * Used to clean up some mess when generating SVG graphics
 */
const preset = {
    svgIco: {
        tag: 'svg',
        ns: 'http://www.w3.org/2000/svg',
        attr: { width: '16', height: '16', viewBox: '0 0 16 16' }
    },
    svgPath: {
        tag: 'path',
        ns: 'http://www.w3.org/2000/svg'
    },
    getSvgTitle: (title) => ({
        tag: 'title',
        ns: 'http://www.w3.org/2000/svg',
        nodes: [title]
    })
};
let groupRegister = {};
/**
 * Generates a unique hex code identifier for each element group.
 * @returns Hex code
 */
const getHexIdentifier = () => {
    let hex = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (groupRegister[hex])
        return getHexIdentifier();
    else
        return hex;
};
/**
 * Adds a group identifier to an element.
 * @param group Styling group identifier
 * @param element Element to add the identifier to
 */
const addIdentifier = (group, element) => {
    let hasGroup = element.hasAttribute(cst.cssGroupAttr);
    if (hasGroup) {
        let attrs = element.getAttribute(cst.cssGroupAttr).split(',');
        attrs.push(group);
        element.setAttribute(cst.cssGroupAttr, attrs.join(','));
    }
    else
        element.setAttribute(cst.cssGroupAttr, group);
};
/**
 * Removes a group identifier from an element.
 * @param group Styling group identifier
 * @param element Element to add the identifier to
 */
const removeIdentifier = (group, element) => {
    let hasGroup = element.hasAttribute(cst.cssGroupAttr);
    if (hasGroup) {
        let ids = element.getAttribute(cst.cssGroupAttr).split(',');
        console.log(ids);
        ids.splice(ids.indexOf(group), 1);
        console.log(ids, ids.length);
        if (ids.length > 0)
            element.setAttribute(cst.cssGroupAttr, ids.join(','));
        else
            element.removeAttribute(cst.cssGroupAttr);
    }
    else
        element.removeAttribute(cst.cssGroupAttr);
};
const currentGroup = new Writable('current-group');
export class ElementStylingGroup {
    constructor() {
        this.targets = [];
        this.active = false;
        this.changes = { ...cst.styleChangeRegisterTemplate };
        this.identifier = getHexIdentifier();
        groupRegister[this.identifier] = this;
        const elems = {
            delete: null,
            generateCss: null,
            checkBall: null,
            itemCount: null,
        };
        this.uiElement = doc.createHTML({
            tag: 'div',
            attr: { className: 'group' },
            nodes: [
                {
                    tag: 'div',
                    attr: { className: 'group-tab' },
                    nodes: [
                        {
                            tag: 'div',
                            attr: { className: 'check-ball' },
                            use: el => elems.checkBall = el,
                        },
                        {
                            tag: 'input',
                            attr: { type: 'text', className: 'name-input', value: `Group ${this.identifier}`, spellcheck: false },
                            evt: {
                                click: (e) => {
                                    let el = e.target;
                                    el.selectionStart = 0;
                                    el.selectionEnd = el.value.length;
                                }
                            }
                        },
                        {
                            $extend: preset.svgIco,
                            use: el => elems.delete = el,
                            nodes: [
                                { $extend: preset.svgPath, attr: { d: "M 12.596194,1.9895924 8,6.5857864 3.4038059,1.9895924 1.9895924,3.4038059 6.5857864,8 1.9895924,12.596194 3.4038059,14.010408 8,9.4142136 12.596194,14.010408 14.010408,12.596194 9.4142136,8 14.010408,3.4038059 Z" } },
                                { $extend: preset.getSvgTitle('Delete group\n(double-click)') }
                            ]
                        },
                        {
                            $extend: preset.svgIco,
                            use: el => elems.generateCss = el,
                            nodes: [
                                { $extend: preset.svgPath, attr: { d: "M 6.1035156 0.56640625 C 4.98382 0.56640625 4.164005 0.79676134 3.6425781 1.2578125 C 3.1266399 1.7188637 2.8671875 2.4890378 2.8671875 3.5703125 L 2.8671875 5.6289062 C 2.8671875 6.7266471 2.4336216 7.2843152 1.5664062 7.3007812 L 1.5664062 8.6914062 C 2.4336216 8.7078722 2.8671875 9.2496446 2.8671875 10.314453 L 2.8671875 12.486328 C 2.8671875 13.534671 3.1200392 14.286625 3.625 14.742188 C 4.1354495 15.203238 4.9618651 15.433594 6.1035156 15.433594 L 6.1035156 14.009766 C 5.6095322 14.009766 5.2616757 13.88334 5.0585938 13.630859 C 4.8610004 13.383868 4.7617188 12.981723 4.7617188 12.421875 L 4.7617188 10.478516 C 4.7617188 9.1557375 4.3304766 8.3339698 3.46875 8.015625 L 3.46875 7.9746094 C 4.3304766 7.6452871 4.7617188 6.8301198 4.7617188 5.5292969 L 4.7617188 3.5292969 C 4.7617186 2.5138866 5.2088568 2.0058594 6.1035156 2.0058594 L 6.1035156 0.56640625 z M 9.8964844 0.56640625 L 9.8964844 2.0058594 C 10.796632 2.0058594 11.246094 2.5138866 11.246094 3.5292969 L 11.246094 5.4882812 C 11.246094 6.8275251 11.675012 7.6628652 12.53125 7.9921875 L 12.53125 8.0253906 C 11.675012 8.3382468 11.246094 9.14449 11.246094 10.445312 L 11.246094 12.4375 C 11.246094 13.002837 11.139841 13.402658 10.925781 13.638672 C 10.717211 13.880175 10.374002 14.004277 9.8964844 14.009766 L 9.8964844 15.433594 C 11.076556 15.433594 11.909942 15.198592 12.398438 14.726562 C 12.886931 14.254535 13.132813 13.493656 13.132812 12.445312 L 13.132812 10.330078 C 13.132812 9.2542922 13.566378 8.7078724 14.433594 8.6914062 L 14.433594 7.3007812 C 13.566378 7.2843151 13.132813 6.7312947 13.132812 5.6445312 L 13.132812 3.546875 C 13.132812 2.5040212 12.877636 1.7454661 12.367188 1.2734375 C 11.856738 0.80140893 11.032646 0.56640625 9.8964844 0.56640625 z " } },
                                { $extend: preset.getSvgTitle('Generate CSS') }
                            ]
                        }
                    ]
                },
                {
                    tag: 'div',
                    attr: { className: 'elements-tab' },
                    nodes: [
                        {
                            $extend: preset.svgIco,
                            evt: { click: (e) => doc.$(this.uiElement).toggleClass('show-elems') },
                            nodes: [
                                { $extend: preset.svgPath, attr: { d: "M 1.6255252,4.6488124 7.9991992,12.428117 14.374475,4.6488124 Z" } },
                                { $extend: preset.getSvgTitle('Show / hide elements') }
                            ]
                        },
                        {
                            tag: 'p',
                            attr: { className: 'el-count' },
                            use: (el) => this.elCountElement = el,
                            nodes: ['Elements: (0)']
                        }
                    ]
                },
                {
                    tag: 'div',
                    attr: { className: 'elements-list' },
                    nodes: [
                        {
                            tag: 'div',
                            attr: { className: 'list-inner' },
                            use: (el) => this.listElement = el,
                        }
                    ]
                }
            ]
        });
        doc.$(elems.checkBall).on('click', () => this.select());
        doc.$(elems.delete).on('dblclick', () => this.delete());
    }
    /**
     * Changes the active group of elements.
     */
    select() {
        for (const key in groupRegister) {
            if (Object.prototype.hasOwnProperty.call(groupRegister, key)) {
                const group = groupRegister[key];
                group.active = false;
                doc.$(group.uiElement).removeClass('active');
            }
        }
        doc.$(this.uiElement).addClass('active');
        currentGroup.set(this.identifier);
        this.active = true;
    }
    /**
     * Deletes the group entirely, does not delete DOM elements from markup.
     */
    delete() {
        // Remove element attributes or specific group identifiers
        for (const key in this.targets) {
            if (Object.prototype.hasOwnProperty.call(this.targets, key)) {
                removeIdentifier(this.identifier, this.targets[key]);
            }
        }
        // Delete the group
        delete groupRegister[this.identifier];
        // Delete group from the UI
        doc.$(this.uiElement).delete();
        // If this was the active group - select the first available one for user convinence
        if (this.active) {
            let groups = Object.keys(groupRegister);
            if (groups.length > 0)
                groupRegister[groups[0]].select();
        }
    }
    updateState() {
        this.elCountElement.textContent = `Elements: (${this.targets.length})`;
        this.listElement.textContent = '';
        this.targets.forEach(elem => {
            const elInfo = doc.getElementInfo(elem);
            const label = doc.createHTML({
                tag: 'div',
                attr: { class: 'elem', title: elInfo.title },
                evt: { mouseEnter: () => highlight.setTarget(elem) },
                nodes: [
                    {
                        tag: 'p',
                        attr: { className: 'tag' },
                        nodes: [elem.tagName]
                    },
                    {
                        tag: 'p',
                        attr: { className: 'id' },
                        nodes: [elInfo.id]
                    },
                    {
                        tag: 'p',
                        attr: { className: 'class' },
                        nodes: [elInfo.classes]
                    },
                    {
                        tag: 'p',
                        attr: { className: 'attr' },
                        nodes: elInfo.attrs
                    },
                    {
                        tag: 'div',
                        attr: { className: 'el-options' },
                        nodes: [
                            {
                                $extend: preset.svgIco,
                                nodes: [
                                    { $extend: preset.svgPath, attr: { d: "M 12.596194,1.9895924 8,6.5857864 3.4038059,1.9895924 1.9895924,3.4038059 6.5857864,8 1.9895924,12.596194 3.4038059,14.010408 8,9.4142136 12.596194,14.010408 14.010408,12.596194 9.4142136,8 14.010408,3.4038059 Z" } },
                                    { $extend: preset.getSvgTitle('Remove element from the group.') }
                                ],
                                evt: {
                                    click: () => {
                                        this.removeTarget(elem);
                                    }
                                }
                            }
                        ]
                    }
                ]
            });
            this.listElement.appendChild(label);
        });
    }
    addTarget(element) {
        this.targets.push(element);
        addIdentifier(this.identifier, element);
        this.updateState();
    }
    removeTarget(element) {
        this.targets.splice(this.targets.indexOf(element), 1);
        removeIdentifier(this.identifier, element);
        this.updateState();
    }
    hasTarget(element) {
        return this.targets.includes(element);
    }
}
export function addToGroup(group, element) {
    if (groupRegister[group])
        if (!groupRegister[group].targets.includes(element)) {
            groupRegister[group].addTarget(element);
            groupRegister[group].updateState();
        }
}
export function removeFromGroup(group, element) {
    if (groupRegister[group])
        if (groupRegister[group].targets.includes(element)) {
            groupRegister[group].removeTarget(element);
            this.updateState();
        }
}
export function getGroup(group) {
    return groupRegister[group];
}
