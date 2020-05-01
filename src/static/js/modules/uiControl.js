import {callerName} from './index.js'

const status = new callerName('dataExport');

export const uiControl = {
    initialize() {
        status.init();
    },
    
    addListeners() {
        document.body.addEventListener('click', (event) => {
            console.log(event.target.closest('.input-group.floating-label'))
        })
    }
}

uiControl.initialize();