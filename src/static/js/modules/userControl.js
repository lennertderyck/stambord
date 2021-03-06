import {app, test, fetchAPI, generateID, callerName} from './index.js';

const status = new callerName('userControl');

export const userControl = {
    initialize() {
        status.init();
        
        this.cache();
        this.addListeners()
    },
    
    cache() {
        status.add('cache');
        
        this.posUsers = document.querySelector('[data-label="listedUsers"]');
        this.addUserForm = document.querySelector('#addUser');
        this.topUpForm = document.querySelector('#topUp');
        this.posCheckout = document.querySelector('[data-label="posUsers"]');
        this.tabFunctions = document.querySelector('#nav-users [data-label="tabFunctions"]');
    },
    
    addListeners() {
        status.add('addListeners');
        
        this.addUserForm.addEventListener('submit', (event) => {
            status.log('user is being added');
            
            event.preventDefault();
            const formData = new FormData(this.addUserForm);
            this.add({
                name: formData.get('name'), 
                credit: formData.get('credit')
            });
            
            // empty fields
            app.clearFields(event.target);
            
            if (formData.get('add-multiple') != 'on') $('#modalAddUser').modal('hide');
        })
        
        this.topUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            status.log('credit is being added to user')
            
            const selectedItem = document.querySelector('#nav-users [data-label="listedUsers"] input:checked').value;
            const formData = new FormData(this.topUpForm);
            this.topUp(selectedItem, formData.get('credit'));
            app.clearFields(event.target)
        })
        
        this.tabFunctions.addEventListener('click', (event) => {
            const targetBtn = event.target.closest('button').dataset.label;
            const selectedItem = document.querySelector('#nav-users [data-label="listedUsers"] input:checked').value;
            
            switch (targetBtn) {
                case 'removeUser':
                    this.delete(selectedItem);
                    break;
                default:
                    status.log('you didn\'t hit an available button')
                    break;
            }
        })
    },
    
    getExampleData() {
        status.add('getData');
        
        fetch('./static/js/exampleData.json')
        .then(response => response.json())
        .then (data => {
            status.log(data[0].users);
            this.render(data[0].users);
        });
    },
    
    add(entry) {
        status.add('addUser');
        if (entry.id == undefined) {entry.id = `user${generateID()}`}
        app.db.users.put({
            id: entry.id,
            name: entry.name,
            credit: parseFloat(entry.credit)
        });
        
        this.render();
    },
    
    render() {
        status.add('renderUsers');
        
        this.posUsers.innerHTML = '';
        this.posCheckout.innerHTML = '';
        
        app.checkRecordAmount()
        
        app.db.users.orderBy('name').each(i => {
            let negativeCredit = false;
            if (i.credit < 0) {
                negativeCredit = true;
            }
            const user = document.createElement('div');
            user.classList.add('table-item', 'container-fluid');
            user.innerHTML = `
                <input type="radio" id="user_${i.id}" name="users" value="${i.id}"><label for="user_${i.id}" class="row px-2" data-user-negative="${negativeCredit}">
                    <div class="col"><span>${i.name}</span></div>
                    <div class="col">€${i.credit.toFixed(2)}</div>
                </label>
            `
            this.posUsers.appendChild(user);
            
            const posCheckoutItem = document.createElement('div');
            posCheckoutItem.classList.add('flex-grid-item');
            posCheckoutItem.innerHTML = `
                <input type="radio" id="checkoutItem_${i.id}" name="checkoutItems" value="${i.id}" data-pos-filter="name:${i.name},id:${i.id}"><label for="checkoutItem_${i.id}" class="pos-el">
                    <h3>${i.name}</h3>
                    <small>€${i.credit.toFixed(2)}</small>
                </label>
            `;
            this.posCheckout.appendChild(posCheckoutItem);
        })
        
        app.hidePaneOptions();
    },
    
    delete(entry) {
        status.add('delete');
            
        app.db.users
            .where({id: entry})
            .delete()
            .then(function (item) {
                status.log( "Deleted " + item);
            });
        
        this.render();
    },
    
    async topUp(entry, credit) {
        status.add('delete');
        
        const userData = await app.db.users.get(entry);
        const newCredit = parseFloat(credit) + userData.credit
        app.db.users.update(entry, {credit: newCredit}).then(function (updated) {
            if (updated)
                status.log('succes')
            else
              status.log ("Nothing was updated - there were no friend with primary key: 2");
        });
        $('#modalTopUp').modal('hide');
        this.render();
    }
}

userControl.initialize();