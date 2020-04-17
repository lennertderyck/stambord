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
        this.posCheckout = document.querySelector('[data-label="posUsers"]');
    },
    
    addListeners() {
        logStatus('addListeners');
        
        this.addUserForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tuser is being added')
            
            const formData = new FormData(this.addUserForm);
            this.addUser(formData.get('name'), formData.get('credit'));
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
            credit: credit
        });
        
        this.renderUsers();
    },
    
    renderUsers() {
        this.posUsers.innerHTML = '';
        logStatus('renderUsersForPos');
        
        app.db.users.each(i => {
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
                    <h3>Uche</h3>
                    <small>€3.00</small>
                </label>
            `;
            this.posItems.appendChild(posCheckoutItem);
        })
    }
}

userControl.initialize();