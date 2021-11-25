
import context from './context/ctx-menu.js';
import groups from './settings/group-manager.js';
import mainTab from './main-tab/main-tab.js';


export default function init() {
    context.init();
    groups.init();
    mainTab.init();
}


