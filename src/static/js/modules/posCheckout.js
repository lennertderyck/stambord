import {app, callerName, datalog} from './index.js';

const status = new callerName('itemControl');

export const posCheckout = {
    initialize() {
        status.init();
        
        this.cache();
        this.addListeners();
        this.quantity = 1;
    },
    
    cache() {
        status.add('cache')
        
        this.checkoutDisplay = document.querySelector('#modalPosConfirm .modal-content .modal-body');
        this.amountSelector = document.querySelector('[data-label="posAmount"]');
        this.cancelCheckout = document.querySelector('[data-label="posCancel"]');
        this.posCheckoutConfirmForm = document.querySelector('#posCheckoutConfirm');
    },
    
    addListeners() {
        status.add('addListeners')
        
        // document.querySelector('[data-label="posConfirm"]').addEventListener('click', () => {
        //     this.confirmCheckout();
        // })
        
        this.cancelCheckout.addEventListener('click', () => {
            app.readyState();
            this.quantity = 1;
            this.amountSelector.classList.add('d-none');
            this.amountSelector.querySelector('input:checked').checked = false;
        })
        
        this.posCheckoutConfirmForm.addEventListener('submit', (event) => {
            status.log('an item was bought')
            event.preventDefault();
            
            // const formData = new FormData(this.posCheckoutConfirmForm);
            this.confirmCheckout();
        })
        
        this.posCheckoutConfirmForm.addEventListener('change', (event) => {
            status.log('something changed');
            // event.preventDefault();
            
            const formData = new FormData(this.posCheckoutConfirmForm);
            this.quantity = formData.get('posCheckoutQuantity');
            this.checkCredit()
            this.calculateNewCredit();
            this.renderCheckoutDisplay();
            // this.gatherData();
            // this.confirmCheckout();
        })
    },
    
    checkout() {
        status.add('checkout')
        
        this.gatherData();
    },
    
    async gatherData() {
        status.add('gatherData');
        
        this.intrest = 0.20;
        
        this.checkoutItemData = await app.db.items.get(app.checkoutItem);
        this.checkoutUserData = await app.db.users.get(app.checkoutUser);
        
        this.negativeCredit = false;
        
        if (this.checkoutItemData.type == 2 || this.checkoutItemData.type == 3 || this.checkoutItemData.type == 4){
            this.showAmountSelector();
        } else {
            this.checkoutItemData.price = this.checkoutItemData.price[0]
            this.checkCredit();
            this.amount = 0;
            this.calculateNewCredit()
            this.renderCheckoutDisplay(this.checkoutItemData);
        }
    },
    
    checkCredit() {
        if (this.checkoutUserData.credit < this.checkoutItemData.price * this.quantity) {
            this.negativeCredit = true;
            this.intrest = 0.20;
        } else {
            this.negativeCredit = false;
            this.intrest = 0;
        }
        status.log('negativeCredit ' + this.negativeCredit);
    },
    
    showAmountSelector() {
        status.add('showAmountSelector');
        
        this.amountSelector.classList.remove('d-none');
    },
    
    renderCheckoutDisplay() {
        status.add('renderCheckoutDisplay');
        
        status.log('negativeCredit ' + this.negativeCredit)
        let intrestText = '+ 20% intrest'
        
        if (this.negativeCredit == true) {
            document.querySelector('#modalPosConfirm .modal-content').classList.add('modal-danger');
        } else {
            document.querySelector('#modalPosConfirm .modal-content').classList.remove('modal-danger');
            intrestText = '';
            this.intrest = 0;
        }
        
        const data = this.checkoutItemData;
        this.checkoutDisplay.innerHTML = `
            <div class="alert alert-danger pt-0 pb-4 px-0 mx-4 mt-4 mb-0" role="alert" data-label="alertCredit">
                <strong class="d-block">Opgelet!</strong>
                <p class="mb-0">Je hebt niet voldoende tegoed om dit te kopen. Hierdoor zal je intrest betalen.
                </p>
            </div>
            <div data-label="checkoutListing" class="container-fluid py-4 px-4 mb-0 bg-color-white">
                <div class="row mb-0 d-flex align-items-center">
                    <div class="col" data-label="posCalulateArea">
                        <h4 class="text-left mb-0">${data.name}</h4>
                        <p class="mb-0 text-left">€${data.price} x ${this.quantity} <span class="fontw-500">${intrestText}</span></p>
                    </div>
                    <div class="col">
                        <div class="input-group floating-label focused">
                            <input type="number" id="posCheckoutQuantity" autocomplete="off" name="posCheckoutQuantity" class="form-control" value="${this.quantity}" min="1" required>
                            <label for="posCheckoutQuantity">aantal</label>
                            <div data-label="posCheckoutChangeQuantity" class="d-none">
                                <button type="button" class="btn-icon" data-action="plus"><i data-feather="plus"></i></button>
                                <button type="button" class="btn-icon" data-action="min"><i data-feather="minus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-0 mx-4">
            <div class="row mx-4 mb-4">
                <div class="col">
                    <p class="text-right text-modern mb-0">totaal <span class="fontw-500">€${((data.price*this.quantity) + ((data.price*this.quantity)*this.intrest)).toFixed(2)}</span></p>
                </div>
            </div>
        `;
        feather.replace();
        $('#modalPosConfirm').modal('show');
        
        this.posCheckoutQuantity = document.querySelector('#posCheckoutConfirm #posCheckoutQuantity');
        this.posCheckoutQuantity.focus();
        
        this.activateQuantityChanger();
    },
    
    calculatePrice(amount) {
        status.add('calculatePrice');
        
        this.amount = parseFloat(amount);
        this.checkoutItemData.price = this.checkoutItemData.price[this.amount];
        
        this.checkCredit();
        
        this.calculateNewCredit()
        this.renderCheckoutDisplay();       
    },
    
    activateQuantityChanger() {
        status.add('activateQuantityChanger');
        
        this.posCheckoutChangeQuantity = document.querySelector('#posCheckoutConfirm [data-label="posCheckoutChangeQuantity"]');
        this.posCheckoutChangeQuantity.addEventListener('click', (event) => {
            console.log(event.target.closest('button[data-action]'));
        })
    },
    
    calculateNewCredit() {
        status.add('calculateNewCredit');
        
        this.checkCredit()
        
        status.log('quantity ' + this.quantity)
        this.newCredit = this.checkoutUserData.credit - ((this.checkoutItemData.price * this.quantity) + ((this.checkoutItemData.price * this.quantity) * this.intrest));
        status.log(this.newCredit);
    },
    
    confirmCheckout() {
        status.add('confirmCheckout');
        
        status.log('quantity ' + this.quantity)
        app.db.users.update(app.checkoutUser, {credit: this.newCredit}).then(function (updated) {
            if (updated)
              console.log ("Friend number 2 was renamed to Number 2");
            else
              console.log ("Nothing was updated - there were no friend with primary key: 2");
        });
        $('#carouselPosSteps').carousel(0);
        
        datalog.addLog({
            user: {
                id: this.checkoutUserData.id,
                name: this.checkoutUserData.name
            },
            item: {
                name: this.checkoutItemData.name,
                quantity: this.quantity
            },
            amount: this.amount,
            price: (this.checkoutItemData.price + (this.checkoutItemData.price*this.intrest))*this.quantity
        })
        
        this.quantity = 1;
        this.amountSelector.classList.add('d-none');
        this.amountSelector.querySelector('input:checked').checked = false;
        app.createToast('Aankoop gelukt!', `Je huidig saldo bedraagt ${this.newCredit.toFixed(2)}`)
        app.readyState();
    }
}

posCheckout.initialize();