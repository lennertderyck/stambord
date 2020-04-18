import {test, logStatus, fetchAPI, generateID} from './functions.js';
import {app} from '../app.js';

export const userControl = {
    initialize() {
        logStatus('initialize', 'userControl.js');
        
        this.cache();
        this.addListeners()
    },
    
    cache() {
        logStatus('cache');
        
        this.posUsers = document.querySelector('[data-label="listedUsers"]');
        this.addUserForm = document.querySelector('#addUser');
        this.topUpForm = document.querySelector('#topUp');
        this.posCheckout = document.querySelector('[data-label="posUsers"]');
        this.tabFunctions = document.querySelector('#nav-users [data-label="tabFunctions"]');
        
    },
    
    addListeners() {
        logStatus('addListeners');
        
        this.addUserForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tuser is being added')
            
            const formData = new FormData(this.addUserForm);
            this.addUser(formData.get('name'), formData.get('credit'));
        })
        
        this.topUpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tcredit is being added to user')
            
            const selectedItem = document.querySelector('#nav-users [data-label="listedUsers"] input:checked').value;
            const formData = new FormData(this.topUpForm);
            this.topUp(selectedItem, formData.get('credit'));
        })
        
        this.tabFunctions.addEventListener('click', (event) => {
            const targetBtn = event.target.closest('button').dataset.label;
            const selectedItem = document.querySelector('#nav-users [data-label="listedUsers"] input:checked').value;
            
            switch (targetBtn) {
                case 'removeUser':
                    this.deleteItem(selectedItem);
                    break;
                default:
                    console.log('\tyou didn\'t hit an available button')
                    break;
            }
        })
    },
    
    getExampleData() {
        logStatus('getData');
        fetch('./static/js/exampleData.json')
        .then(response => response.json())
        .then (data => {
            console.log(data[0].users);
            this.renderUsers(data[0].users);
        });
    },
    
    addUser(name, credit) {
        app.db.users.put({
            id: `user${generateID()}`,
            name: name,
            credit: parseFloat(credit)
        });
        
        this.renderUsers();
    },
    
    renderUsers() {
        logStatus('renderUsers');
        
        this.posUsers.innerHTML = '';
        this.posCheckout.innerHTML = '';
        
        app.db.users.each(i => {
            i.price = parseFloat(i.price).toFixed(2)
            const user = document.createElement('div');
            user.classList.add('table-item', 'container-fluid');
            user.innerHTML = `
                <input type="radio" id="user_${i.id}" name="users" value="${i.id}"><label for="user_${i.id}" class="row">
                    <div class="col">${i.name}</div>
                    <div class="col">€${i.credit}</div>
                </label>
            `
            this.posUsers.appendChild(user);
            
            const posCheckoutItem = document.createElement('div');
            posCheckoutItem.classList.add('flex-grid-item');
            posCheckoutItem.innerHTML = `
                <input type="radio" id="checkoutItem_${i.id}" name="checkoutItems" value="${i.id}"><label for="checkoutItem_${i.id}" class="pos-el">
                    <h3>${i.name}</h3>
                    <small>€${i.credit}</small>
                </label>
            `;
            this.posCheckout.appendChild(posCheckoutItem);
        })
    },
    
    deleteItem(entry) {
        console.log(entry)
            
        app.db.users
            .where({id: entry})
            .delete()
            .then(function (item) {
                console.log( "Deleted " + item);
            });
        
        this.renderUsers();
    },
    
    async topUp(entry, credit) {
        console.log(`\t${entry}, ${credit}`);
        
        const userData = await app.db.users.get(entry);
        
        const newCredit = parseFloat(credit) + userData.credit
        app.db.users.update(entry, {credit: newCredit}).then(function (updated) {
            if (updated)
                console.log('succes')
            else
              console.log ("Nothing was updated - there were no friend with primary key: 2");
        });
        this.renderUsers();
    }
}

userControl.initialize();