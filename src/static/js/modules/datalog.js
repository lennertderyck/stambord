import {app, test, fetchAPI, generateID, callerName} from './index.js';

const status = new callerName('datalog');

moment.locale('nl-be');

export const datalog = {
    initialize() {
        status.init();
        
        this.cache();
        this.addListeners()
    },
    
    cache() {
        status.add('cache');
        
        this.posItems = document.querySelector('[data-label="logs"]');
    },
    
    addListeners() {
        // setInterval(() => {
        //     datalog.renderData();
        // }, 1000 * 30);
        
        $('#nav-log-tab').on('shown.bs.tab', (event) => {
            datalog.renderData();
        })
    },
    
    addLog(entry) {
        status.log('this item will be logged ' + entry.item)
        
        console.log(entry);
        if (entry.date == undefined) {entry.date = new Date().getTime()}
        console.log(entry);
        app.db.logs.put({
            date: entry.date,
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
                input = 'Dubbel';
                break;
        
            case 2:
                input = 'Extra';
                break;
        }
        return input;
    },
    
    renderData() {
        status.add('renderData');
        
        this.posItems.innerHTML = '';

        app.db.logs.each(i => {
            const time = moment(i.date);
               
            const item = document.createElement('div');
            item.classList.add('table-item', 'container-fluid');
            item.innerHTML = `
                <input type="radio" id="log_${i.date}" name="logs" value="${i.date}"><label for="log_${i.date}" class="row px-2">
                    <div class="col">
                        <span class="d-block">${time.fromNow()}</span>
                        <small class="text-modern">${time.format("HH:MM")} – ${time.format("L")}</small>
                    </div>
                    <div class="col">
                        <span class="d-block">${i.user.name}</span>
                    </div>
                    <div class="col">
                        <span>${i.item}</span>
                        <small class="text-modern">${this.itemAmount(i.amount)}</small>
                    </div>
                    <div class="col">
                        <span class="d-block">€${i.price.toFixed(2)}</span>
                    </div>
                </label>
            `
            this.posItems.prepend(item);
        })
    }
}

datalog.initialize();