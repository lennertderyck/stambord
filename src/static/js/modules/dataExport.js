import {app, callerName, userControl, itemControl, datalog} from './index.js'

const status = new callerName('dataExport');

export const dataExport = {
    async initialize() {
        status.init();
        
        this.cache();
        this.addListeners();
    },
    
    cache() {
        status.add('cache');
        
        this.exportBtn = document.querySelector('[data-label="exportBackup"]');
        this.importBtn = document.querySelector('[data-label="importBackup"]');
        this.fileImportField = document.querySelector('[data-label="fileinput"]');
        
        status.log(this.fileImportField)
    },
    
    readyState() {
        status.add('readyState');
        
        this.fileImportField.value = '';
        this.importBtn.setAttribute('disabled', 'true');
    },
    
    addListeners() {
        status.add('addListeners');
        
        this.exportBtn.addEventListener('click', this.export);
        this.importBtn.addEventListener('click', this.import);
        this.fileImportField.addEventListener('change', (event) => {
            status.log('somehing happened')
            if (event.target.files[0].name.endsWith('.bar') == true) {
                this.importBtn.removeAttribute('disabled');
            } else {
                app.errorText('importFileType', 'Bestandstype moet <strong>.bar</strong> zijn, upload een ander bestand');
            }
        })
    },
    
    async export() {
        status.add('export');
        
        app.createToast('Backup', 'Backup wordt klaargemaakt, dit kan even duren')
        
        this.exportedData = { 
            users: [],
            items: [],
            logs: []
        };
            
        await app.db.users.each(i => {
            this.exportedData.users.push({
                credit: i.credit,
                id: i.id,
                name: i.name
            });
        });
        
        await app.db.items.each(i => {
            this.exportedData.items.push({
                id: i.id,
                name: i.name,
                price: i.price,
                profit: i.profit,
                type: i.type
            });
        });
        
        await app.db.logs.each(i => {
            this.exportedData.logs.push({
                amount: i.amount,
                date: i.date,
                item: {
                    name: i.item.name, 
                    quantity: i.item.quantity
                },
                price: i.price,
                user: {
                    id: i.user.id,
                    name: i.user.name,
                }
            });
        });
        
        // app.createToast('Backup', 'Backup is klaar om te downloaden')
        
        const blob = await new Blob([JSON.stringify(this.exportedData)], {type: 'application/javascript'});
        await saveAs(blob, `barbord_backup_${new Date().getTime()}.bar`)
    },
    
    import() {
        status.add('import');
        
        var file, fr;
            
        if (typeof window.FileReader !== 'function') {
            // alert("The file API isn't supported on this browser yet.");
            app.createToast('Backup', 'De vereiste API wordt niet ondersteund')
            return;
        }
    
        // dataExport.fileImportField = document.querySelector('[data-label="fileinput"]');
        // let filename = this.fileImportField.value.split("\\").pop();
    
        status.log(dataExport.fileImportField)
        if (!dataExport.fileImportField) {app.createToast('Backup', 'Fout bij het importeren')}
        else if (!dataExport.fileImportField.files) {app.createToast('Backup', 'Deze browser ondersteund deze functie niet')}
        else if (!dataExport.fileImportField.files[0]) {app.createToast('Backup', 'Upload eerst een bestand')}
        else {
            file = dataExport.fileImportField.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
            $('#modalDataImport').modal('hide')
            app.createToast('Backup', 'Terugzetten gegevens gelukt')
        }
        
        async function receivedText(e) {
            let lines = e.target.result;
            const importedData = JSON.parse(lines);
            
            // function addZero(i) {
            //     if (i < 10) {
            //         i = "0" + i;
            //     }
            //     return i;
            // }
            
            app.deleteDexieData();
            
            await importedData.items.forEach(i => {
                itemControl.add({
                    id: i.id,
                    name: i.name,
                    profit: i.profit,
                    type: i.type,
                    price: i.price
                });
            });
            
            await importedData.users.forEach(i => {
                userControl.add({
                    id: i.id,
                    name: i.name,
                    credit: parseFloat(i.credit)
                });
            });
            
            await importedData.logs.forEach((i, index) => {
                datalog.addLog({
                    date: i.date,
                    user: {
                        id: i.user.id,
                        name: i.user.name
                    },
                    item: {
                        name: i.item.name, 
                        quantity: i.item.quantity
                    },
                    amount: i.amount,
                    price: i.price
                })
                
                status.log(importedData.logs.length);
                status.log(index+1);
                
                if (index+1 == importedData.logs.length) { 
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                }
            });
            
        }
        
        app.readyState();
        dataExport.readyState();
    }
}