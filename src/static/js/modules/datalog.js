import {test, logStatus, fetchAPI, generateID} from './functions.js';
import {app} from '../app.js';

export const datalog = {
    initialize() {
        logStatus('initialize', 'datalog.js');
    },
    
    cache() {
        logStatus('cache');
        
        this.posItems = document.querySelector('[data-label="logs"]');
    },
    
    addLog(entry) {
        console.log('\tthis item will be added ' + entry.name)
        app.db.items.put({
            date: new Date(),
            user: {
                id: entry.user.id,
                name: entry.user.name
            },
            item: entry.item,
            amount: entry.amount,
            price: entry.price
        });
        
        this.renderItems();
    },
    
    renderItems() {
        this.posItems.innerHTML = '';
        logStatus('renderUsersForPos');
        
        app.db.logs.each(i => {
            const item = document.createElement('div');
            item.classList.add('table-item', 'container-fluid');
            item.innerHTML = `
                <input type="radio" id="log_${i.date}" name="logs" value="${i.date}"><label for="log_${i.data}" class="row">
                    <div class="col">
                        <span class="d-block">23:46</span>
                        <small class="text-modern">18/04/2020</small>
                    </div>
                    <div class="col">
                        <span class="d-block">Mark</span>
                    </div>
                    <div class="col">
                        <span>Frivo</span>
                        <small class="text-modern">dubbel</small>
                    </div>
                    <div class="col">
                        <span class="d-block">€2,4</span>
                    </div>
                </label>
                
                // date
                // user id + name
                // amount
                // price
            `
            this.posItems.appendChild(item);
        })
    }
}