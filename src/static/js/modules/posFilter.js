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
            this.filter({
                pane: userControl.posCheckout, 
                keys: ['name', 'id'], 
                entry: event.target.value.toLowerCase()
            });
        })
        
        this.itemFilter.addEventListener('keyup', (event) => {
            this.filter({
                pane: itemControl.posCheckout, 
                keys: ['name', 'id', 'type'], 
                entry: event.target.value.toLowerCase()
            });
        })
    },
    
    filter({pane, keys, entry}) {        
        status.add('filter');
        const posButtons = pane.querySelectorAll('.flex-grid-item input');
        posButtons.forEach(i => { // each posButton
            let filter = [];
            
            keys.forEach(x => { // check if entry contains ...
                filter.push(i.dataset.posFilter.toLowerCase().includes(`${x}:${entry}`));
            })
            
            if (filter.includes(true) == false) {
                i.parentNode.classList.add('d-none');
            }
            if (filter.includes(true) == true) {
                i.parentNode.classList.remove('d-none');
            }
        })
    }
}

posFilter.initialize();