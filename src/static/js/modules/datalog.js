import {test, logStatus, fetchAPI, generateID} from './functions.js';
import {app} from '../app.js';

export const datalog = {
    initialize() {
        logStatus('initialize', 'datalog.js');
        
        this.cache();
    },
    
    cache() {
        logStatus('cache');
        
        this.posItems = document.querySelector('[data-label="logs"]');
    },
    
    addLog(entry) {
        console.log('\tthis item will be logged ' + entry.item)
        app.db.logs.put({
            date: new Date().getTime(),
            user: {
                id: entry.user.id,
                name: entry.user.name
            },
            item: entry.item,
            amount: entry.amount,
            price: entry.price
        });
    },
    
    itemAmount(input) {
        switch (input) {
            case 0:
                input = 'Enkel';
                break;
        
            case 1:
                input = 'Dubbem';
                break;
        
            case 2:
                input = 'Extra';
                break;
        }
        return input;
    },
    
    renderData() {
        logStatus('renderData');
        
        this.posItems.innerHTML = '';
        console.log('\tlogs cleaned out')

        app.db.logs.each(i => {           
            const item = document.createElement('div');
            item.classList.add('table-item', 'container-fluid');
            item.innerHTML = `
                <input type="radio" id="log_${i.date}" name="logs" value="${i.date}"><label for="log_${i.date}" class="row">
                    <div class="col">
                        <span class="d-block">${moment(i.date).format("hh:mm")}</span>
                        <small class="text-modern">18/04/2020</small>
                    </div>
                    <div class="col">
                        <span class="d-block">${i.user.name}</span>
                    </div>
                    <div class="col">
                        <span>${i.item}</span>
                        <small class="text-modern">${this.itemAmount(i.amount)}</small>
                    </div>
                    <div class="col">
                        <span class="d-block">€${i.price}</span>
                    </div>
                </label>
            `
            this.posItems.prepend(item);
        })
    }
}

datalog.initialize();