import {callerName} from './functions.js';
import {userControl} from './userControl.js';
import { itemControl } from './itemControl.js';
import {app} from '../app.js';

const status = new callerName('posFilter');

export const posFilter = {
    initialize() {
        status.init();

        this.cache();
        this.addListeners();
    },
    
    cache() {
        status.add('cache');
        this.userFilter = document.querySelector('#posUserFilter');
        this.itemFilter = document.querySelector('#posItemFilter');
    },
    
    addListeners() {
        status.add('addListeners');
        
        this.userFilter.addEventListener('keyup', (event) => {
            this.filter(userControl.posCheckout, event.target.value.toLowerCase())
        })
        
        this.itemFilter.addEventListener('keyup', (event) => {
            this.filter(itemControl.posCheckout, event.target.value.toLowerCase())
        })
    },
    
    filter(pane,entry) {
        status.add('filter');
        const items = pane.querySelectorAll('.flex-grid-item input');
        items.forEach(i => {
            const filter = i.dataset.posFilter.toLowerCase().includes(entry);
            if (filter == false) {
                i.parentNode.classList.add('d-none');
            }
            if (filter == true) {
                i.parentNode.classList.remove('d-none');
            }
        })
    }
}

posFilter.initialize();