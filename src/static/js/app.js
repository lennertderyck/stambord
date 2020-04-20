import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse@4.0.0';
import {test, generateID, callerName} from './modules/functions.js';
import {dataExport} from './modules/dataExport.js';
import {datalog} from './modules/datalog.js';
import {posCheckout} from './modules/posCheckout.js';
import {userControl} from './modules/userControl.js';
import {itemControl} from './modules/itemControl.js';
import {settings} from './modules/settings.js';

sesamCollapse.initialize();

const status = new callerName('app');

export const app = {
    initialize() {
        status.init();
        
        this.dexie();
        this.addListeners();
        this.toastIndex = 0;
        
        dataExport.initialize();
        settings.addListeners();
        this.readyState();
    },
    
    readyState() {
        status.add('readyState');
        
        $('#carouselPosSteps').carousel(0);
        userControl.renderUsers();
        itemControl.renderItems();
        datalog.renderData();
    },
    
    emptyDomLists() {
        itemControl.posItems.innerHTML = '';
        userControl.posUsers.innerHTML = '';
    },
    
    dexie() {
        status.add('dexie');
        
        this.db = new Dexie('users');
        this.db.version(1).stores({ 
            users: "id,name,credit",
            items: "id,name,profit,type,price",
            logs: "date,user,item,amount,price"
        });
        this.db.open();
    },
    
    deleteDexieData() {
        status.add('deleteDexieData');
        
        this.dexieDeleteUsers();
        this.dexieDeleteItems();
        this.dexieDeleteLogs();        
        
        this.readyState();
    },
    
    async dexieDeleteUsers() {
        status.add('dexieDeleteUsers');
        
        this.db.users
            .where('id').startsWith('user')
            .delete()
            .then(function (deleteCount) {
                console.log( "Deleted " + deleteCount + " objects");
            });
    },
    
    async dexieDeleteItems() {
        status.add('dexieDeleteItems');
        
        this.db.items
            .where('id').startsWith('item')
            .delete()
            .then(function (deleteCount) {
                console.log( "Deleted " + deleteCount + " objects");
            });
    },
    
    async dexieDeleteLogs() {
        status.add('dexieDeleteLogs');
        
        this.db.logs
            .where('item').startsWith('')
            .delete()
            .then(function (deleteCount) {
                console.log( "Deleted " + deleteCount + " objects");
            });
    },
    
    addListeners() {
        status.add('addListeners');
        
        userControl.posCheckout.addEventListener('change', (event) => {
            this.checkoutUser = event.target.value;
            $('#carouselPosSteps').carousel('next');
        });
        
        itemControl.posCheckout.addEventListener('change', (event) => {
            this.checkoutItem = event.target.value;
            posCheckout.amountSelector.classList.add('d-none');
            posCheckout.checkout();
        });
        
        posCheckout.amountSelector.addEventListener('change', (event) => {
            posCheckout.calculatePrice(event.target.value);
        });
    },
    
    logging() {
        status.add('logging');
    },
    
    clearFields() {
        status.add('clearFields');
        
        const fields = document.querySelectorAll('[data-clear-field]');
        
        fields.forEach(i => {
            i.value = '';
        })
    },
    
    createToast(title, message) {
        status.add('createToast');
        
        console.log(this.toastIndex);
    
        let now, moment;
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        now = new Date()
        moment = {
            dd: addZero(now.getDate()),
            mm: addZero(now.getMonth() + 1),
            yyyy: now.getFullYear(),
            hh: addZero(now.getHours()),
            nn: addZero(now.getMinutes()),
        }
    
        let toast = document.createElement('div');
        this.toastIndex ++;
    
        toast.classList.add('toast', 'animated', 'fadeInRight', 'faster');
        toast.setAttribute('data-toast', `toastIndex${this.toastIndex}`);
        toast.setAttribute('data-delay', `3500`);
        toast.setAttribute('role', `alert`);
        toast.setAttribute('aria-atomic', `true`);
        toast.setAttribute('aria-live', `assertive`);
    
        toast.innerHTML = `
            <div class="toast-body">
                <p class="toast-title mr-auto text-modern bold mb-0">${title}</p>
                <p class="toast-content mb-0">${message}</p>
                <small class="text-muted d-none">${moment.hh}:${moment.nn}</small>
            </div>
            <button type="button" class="close" data-dismiss="toast" aria-label="Close">
                <div class="icon-md"><i data-feather="x"></i></div>
            </button>
        `
    
        toast.addEventListener('animationend', function() {toast.classList.add('animated', 'fadeOutRight', 'delay-3s')})
    
        document.querySelector('#toastContainer').appendChild(toast);
        feather.replace();
        $(`[data-toast="toastIndex${this.toastIndex}"]`).toast('show');
    },
    
    errorText(element, content) {
        element = document.querySelectorAll(`[data-error="${element}"]`);
        element.forEach((el) => {
            // el.style.display = 'block !important';  
            el.innerHTML = content;
        })
    }
}

app.initialize();