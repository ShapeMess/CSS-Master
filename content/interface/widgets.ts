
import Writable from '../lib/writables.js';
import context from './context/ctx-menu.js';
import groups from './settings/group-manager.js';

const scaleRatio = new Writable('scale-ratio');


export default function init() {
    context.init();
    groups.init();

    let ratio = window.devicePixelRatio;
    window.addEventListener('resize', () => {
        let _ratio = window.devicePixelRatio;
        if (ratio !== _ratio) scaleRatio.set(1 / _ratio);
    })
}


