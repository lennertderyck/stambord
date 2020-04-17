import {sesamCollapse, sesam} from 'https://unpkg.com/sesam-collapse@4.0.0';
import {test, logStatus, generateID} from './modules/functions.js';
import {userControl} from './modules/userControl.js';
import {itemControl} from './modules/itemControl.js';
import {settings} from './modules/settings.js';

sesamCollapse.initialize();

export const app = {
    initialize() {
        logStatus('initialize', 'app.js')
        
        this.dexie();
        
        settings.addListeners();
        userControl.renderUsers();
        itemControl.renderItems()
    },
    
    dexie() {
        this.db = new Dexie('users');
        this.db.version(1).stores({ 
            users: "id,name,credit",
            items: "id,name,profit,type,price",
            logs: "date,user,item,amount,price"
        });
        this.db.open();
    },
    
    addListeners() {

    },
    
    logging() {
        logStatus('logging')
    }
}

app.initialize();