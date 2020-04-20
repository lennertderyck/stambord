import {test, fetchAPI, generateID, callerName} from './functions.js';
import {app} from '../app.js';
import {datalog} from './datalog.js';

const status = new callerName('itemControl');

export const posCheckout = {
    initialize() {
        status.init();
        
        this.cache();
        this.addListeners();
    },
    
    cache() {
        status.add('cache')
        
        this.checkoutDisplay = document.querySelector('#modalPosConfirm .modal-content .modal-body');
        this.amountSelector = document.querySelector('[data-label="posAmount"]');
    },
    
    addListeners() {
        status.add('addListeners')
        
        document.querySelector('[data-label="posConfirm"]').addEventListener('click', () => {
            this.confirmCheckout();
        })
    },
    
    checkout() {
        status.add('checkout')
        
        this.gatherData();
    },
    
    async gatherData() {
        status.add('gatherData');
        
        this.checkoutItemData = await app.db.items.get(app.checkoutItem);
        this.checkoutUserData = await app.db.users.get(app.checkoutUser);
        
        if (this.checkoutItemData.type == 2 || this.checkoutItemData.type == 3 || this.checkoutItemData.type == 4){
            this.showAmountSelector();
        } else {
            this.checkoutItemData.price = this.checkoutItemData.price[0]
            this.amount = 0;
            this.calculateNewCredit()
            this.renderCheckoutDisplay(this.checkoutItemData);
        }
    },
    
    showAmountSelector() {
        status.add('showAmountSelector');
        
        this.amountSelector.classList.remove('d-none');
    },
    
    renderCheckoutDisplay() {
        status.add('renderCheckoutDisplay');
        
        const data = this.checkoutItemData;
        this.checkoutDisplay.innerHTML = `
            <div class="alert alert-danger pt-0 pb-4 px-0 mb-4" role="alert" data-label="alertCredit">
                <strong class="d-block">Opgelet!</strong>
                <p class="mb-0">Je hebt niet voldoende tegoed om dit te kopen. Hierdoor zal je intrest betalen.
                </p>
            </div>
            <div class="row">
                <div class="col" data-label="posCalulateArea">
                    <h4 class="text-left mb-0">${data.name}</h4>
                    <p class="mb-0 text-left"><span class="fontw-500">€${data.price}</span></p>
                    <hr>
                    <p class="text-right text-modern">totaal <span class="fontw-500">€${data.price}</span></p>
                </div>
            </div>
        `;
        $('#modalPosConfirm').modal('show');
    },
    
    calculatePrice(amount) {
        status.add('calculatePrice');
        
        this.amount = parseFloat(amount);
        
        status.log(' + this.checkoutItemData.price[this.amount]')
        this.checkoutItemData.price = this.checkoutItemData.price[this.amount];
        
        this.calculateNewCredit()
        this.renderCheckoutDisplay();
    },
    
    calculateNewCredit() {
        status.add('calculateNewCredit');
        
        this.newCredit = this.checkoutUserData.credit - this.checkoutItemData.price;
    },
    
    confirmCheckout() {
        status.add('confirmCheckout');
        
        app.db.users.update(app.checkoutUser, {credit: this.newCredit}).then(function (updated) {
            if (updated)
              console.log ("Friend number 2 was renamed to Number 2");
            else
              console.log ("Nothing was updated - there were no friend with primary key: 2");
        });
        $('#carouselPosSteps').carousel(0);
        
        status.log(this.amount);
        
        datalog.addLog({
            user: {
                id: this.checkoutUserData.id,
                name: this.checkoutUserData.name
            },
            item: this.checkoutItemData.name,
            amount: this.amount,
            price: this.checkoutItemData.price
        })
        
        app.readyState();
    }
}

posCheckout.initialize();