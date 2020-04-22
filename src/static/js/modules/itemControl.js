import {test, fetchAPI, generateID, callerName} from './functions.js';
import {app} from '../app.js';

const status = new callerName('itemControl');

export const itemControl = {
    initialize() {
        status.init();
        
        this.cache();
        this.addListeners()
    },
    
    cache() {
        status.add('cache');
        
        this.posItems = document.querySelector('[data-label="listedItems"]');
        this.addItemForm = document.querySelector('#addItem');
        this.posCheckout = document.querySelector('[data-label="posItems"]');
        this.tabFunctions = document.querySelector('#nav-items [data-label="tabFunctions"]');
    },
    
    addListeners() {
        status.add('addListeners');
        
        // this.posItems.addEventListener('click', (event) => {
        //     const targetBtn = event.target.closest('button').dataset.label;
        // })
        
        this.addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();
            status.log('user is being added')
            
            const formData = new FormData(this.addItemForm);
            this.addItem({
                name: formData.get('name'),
                profit: parseFloat(formData.get('price')),
                type: formData.get('itemType'),
                price: [parseFloat(formData.get('priceSingle')), parseFloat(formData.get('priceDouble')), parseFloat(formData.get('priceExtra'))],
            });
        })
        
        this.tabFunctions.addEventListener('click', (event) => {
            const targetBtn = event.target.closest('button').dataset.label;
            const selectedItem = document.querySelector('#nav-items [data-label="listedItems"] input:checked').value;
            
            switch (targetBtn) {
                case 'removeItem':
                    this.delete(selectedItem);
                    break;
                default:
                    status.log('you didn\'t hit an available button')
                    break;
            }
        })
    },
    
    itemTypes(input) {
        switch (input) {
            case '1':
                input = 'Fris / Bier';
                break;
        
            case '2':
                input = 'Shotje';
                break;
        
            case '3':
                input = 'Sterk';
                break;
        
            case '4':
                input = 'Cocktail';
                break;
        
            case '5':
                input = 'Snacks';
                break;
        }
        return input;
    },
    
    addItem(entry) {
        status.log('this item will be added ' + entry.name)
        if (entry.id == undefined) {entry.id = `item${generateID()}`}
        app.db.items.put({
            id: entry.id,
            name: entry.name,
            profit: entry.profit,
            type: entry.type,
            price: entry.price
        });
        
        this.renderItems();
    },
    
    renderItems() {
        status.add('renderItems');
        
        this.posItems.innerHTML = '';
        this.posCheckout.innerHTML = '';
        
        app.checkRecordAmount()
        
        app.db.items.orderBy('name').each(i => {
            const item = document.createElement('div');
            item.classList.add('table-item', 'container-fluid');
            item.innerHTML = `
                <input type="radio" id="item_${i.id}" name="items" value="${i.id}"><label for="item_${i.id}" class="row" data-item-type="${i.type}">
                    <div class="col">
                        <span>${i.name}</span>
                    </div>
                    <div class="col">
                        <span>${this.itemTypes(i.type)}</span>
                    </div>
                    <div class="col">
                        <span class="d-block">€${i.price[0]}</span>
                        <small class="item-type-prices"><span class="text-modern">dubbel</span> €${i.price[1].toFixed(2)} &nbsp; – &nbsp; <span class="text-modern">extra</span> €${i.price[2].toFixed(2)}</small>
                    </div>
                </label>
            `
            this.posItems.appendChild(item);
            
            const posCheckoutUser = document.createElement('div');
            posCheckoutUser.classList.add('flex-grid-item');
            posCheckoutUser.innerHTML = `
                <input type="radio" id="checkoutItem_${i.id}" name="checkoutItems" value="${i.id}" data-pos-filter="${i.name.toLowerCase()},${i.id},${this.itemTypes(i.type)}"><label for="checkoutItem_${i.id}" class="pos-el" data-item-type="${i.type}">
                    <h3>${i.name}</h3>
                    <small><span>enkel <strong>€${i.price[0]}</strong></span><span class="item-type-prices"> – dubbel <strong>€${i.price[1]}</strong></span><span class="item-type-prices"> – extra <strong>€${i.price[2]}</strong></span></small>
                </label>
            `;
            this.posCheckout.appendChild(posCheckoutUser);
        })
        
        app.hidePaneOptions();
    },
    
    delete(entry) {
        console.log(entry)
            
        app.db.items
            .where({id: entry})
            .delete()
            .then(function (item) {
                console.log( "Deleted " + item);
            });
        
        this.renderItems();
    }
}

itemControl.initialize()