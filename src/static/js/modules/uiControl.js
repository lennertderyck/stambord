import {callerName} from './index.js'

const status = new callerName('dataExport');

export const uiControl = {
    initialize() {
        status.init();
        
        this.addListeners()
                
        if (readCookie('screen-width-dismiss') == null) {
            this.checkWindowSize();      
        }
    },
    
    addListeners() {
        status.add('addListeners');
        
        // document.body.addEventListener('click', (event) => {
        //     console.log(event.target.closest('.input-group.floating-label'))
        // })
        
        document.querySelector('#modalScreenWidth .modal-footer').addEventListener('click', (event) => {
            this.dismissScreenWidthModal(event.target.closest('button').dataset.label)
        })
    },
    
    checkWindowSize() {
        if ((window.innerWidth < 800) == true) {$('#modalScreenWidth').modal('show')}
    },
    
    dismissScreenWidthModal(input) {        
        switch (input) {
            case 'dismissNow':
                createCookie('screen-width-dismiss', 'true', 1)
                break;
        
            case 'dismissAlways':
                createCookie('screen-width-dismiss', 'true')
                break;
        
            default:
                break;
        }
    }
}