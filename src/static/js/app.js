import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse@4.0.0';
import {test, logStatus, generateID} from './modules/functions.js';
import {datalog} from './modules/datalog.js';
import {posCheckout} from './modules/posCheckout.js';
import {userControl} from './modules/userControl.js';
import {itemControl} from './modules/itemControl.js';
import {settings} from './modules/settings.js';

sesamCollapse.initialize();

export const app = {
    initialize() {
        logStatus('initialize', 'app.js')
        
        this.dexie();
        this.addListeners();
        
        settings.addListeners();
        this.readyState();
    },
    
    readyState() {
        $('#carouselPosSteps').carousel(0);
        userControl.renderUsers();
        itemControl.renderItems();
        datalog.renderData();
    },
    
    dexie() {
        logStatus('dexie');
        
        this.db = new Dexie('users');
        this.db.version(1).stores({ 
            users: "id,name,credit",
            items: "id,name,profit,type,price",
            logs: "date,user,item,amount,price"
        });
        this.db.open();
    },
    
    addListeners() {
        logStatus('addListeners');
        
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
        logStatus('logging')
    }
}

app.initialize();