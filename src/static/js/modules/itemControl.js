import {test, logStatus, fetchAPI, generateID} from './functions.js';
import {app} from '../app.js';

export const itemControl = {
    initialize() {
        logStatus('initialize', 'userControl.js');
        
        this.cache();
        this.addListeners()
    },
    
    cache() {
        logStatus('cache');
        
        this.posItems = document.querySelector('[data-label="listedItems"]');
        this.addItemForm = document.querySelector('#addItem');
        this.posCheckout = document.querySelector('[data-label="posItems"]');
    },
    
    addListeners() {
        logStatus('addListeners');
        
        this.addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tuser is being added')
            
            const formData = new FormData(this.addItemForm);
            this.addItem({
                name: formData.get('name'),
                profit: parseFloat(formData.get('price')),
                type: formData.get('itemType'),
                price: [parseFloat(formData.get('priceSingle')), parseFloat(formData.get('priceDouble')), parseFloat(formData.get('priceExtra'))],
            });
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
        console.log('\tthis item will be added ' + entry.name)
        app.db.items.put({
            id: `item${generateID()}`,
            name: entry.name,
            profit: entry.profit,
            type: entry.type,
            price: entry.price
        });
        
        this.renderItems();
    },
    
    renderItems() {
        logStatus('renderItems');
        
        this.posItems.innerHTML = '';
        this.posCheckout.innerHTML = '';
        
        app.db.items.each(i => {
            const item = document.createElement('div');
            item.classList.add('table-item', 'container-fluid');
            item.innerHTML = `
                <input type="radio" id="item_${i.id}" name="items" value="${i.id}"><label for="item_${i.id}" class="row">
                    <div class="col">
                        <span>${i.name}</span>
                    </div>
                    <div class="col">
                        <span>${this.itemTypes(i.type)}</span>
                    </div>
                    <div class="col">
                        <span class="d-block">€${i.price[0]}</span>
                        <small><span class="text-modern">dubbel</span> €${i.price[1].toFixed(2)} &nbsp; – &nbsp; <span class="text-modern">extra</span> €${i.price[2].toFixed(2)}</small>
                    </div>
                </label>
            `
            this.posItems.appendChild(item);
            
            const posCheckoutUser = document.createElement('div');
            posCheckoutUser.classList.add('flex-grid-item');
            posCheckoutUser.innerHTML = `
                <input type="radio" id="checkoutItem_${i.id}" name="checkoutItems" value="${i.id}"><label for="checkoutItem_${i.id}" class="pos-el">
                    <h3>${i.name}</h3>
                    <small>€${i.price}</small>
                </label>
            `;
            this.posCheckout.appendChild(posCheckoutUser);
        })
    }
}

itemControl.initialize()