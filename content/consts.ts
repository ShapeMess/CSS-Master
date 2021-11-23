
export const prefix = '_cssm_';
export const logPrefix = '[CSSM]';
export const cssDataset = 'data-cssm-x';

export const selectDisableTags = [ 'html', 'body', 'head', 'meta', 'link', 'script' ];
export const contentWrap = document.createElement('div');
contentWrap.classList.add(`${prefix}content-wrap`);

export const styleChangeRegisterTemplate = {
    display: null as string
}