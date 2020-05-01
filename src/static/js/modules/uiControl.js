import { callerName } from './index.js';
import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse@4.0.0';

const status = new callerName('dataExport');

export const uiControl = {
    initialize() {
        status.init();
        
        this.addListeners()
                
        if (readCookie('screen-width-dismiss') == null) {
            this.checkWindowSize();      
        }
        
        this.collapseMenuTargets = document.querySelectorAll('[data-sesam-target].collapse-menu');
    },
    
    addListeners() {
        status.add('addListeners');
        
        document.body.addEventListener('click', (event) => {
            this.sesamCloseClickedOutside(event.target.closest('[data-sesam-target].collapse-menu'))
        })
        
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
    },
    
    sesamCloseClickedOutside(clickedItem) {
        const itemToClose = document.querySelector('[data-sesam-target].collapse-menu.sesam-show');
        if (clickedItem == null && itemToClose != null) {
            status.add('sesamCloseClickedOutside');
            sesamCollapse.itemHide(itemToClose);
        }
    }
}