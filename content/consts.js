export const prefix = '_cssm_';
export const logPrefix = '[CSSM]';
export const cssGroupAttr = 'cssm-group';
export const selectionDisabledTags = ['html', 'body', 'head', 'meta', 'link', 'script'];
export const disabledAttributes = ['id', 'class', cssGroupAttr];
export const contentWrap = document.createElement('div');
contentWrap.classList.add(`${prefix}content-wrap`);
export const styleChangeRegisterTemplate = {
    display: null
};
