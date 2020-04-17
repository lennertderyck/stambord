let toastIndex = 0;

(() => {
    const app = {
        initialize() {
            console.log('\n' + `%c[service] main.js ${arguments.callee.name}() running! \n` + ' ', 'color: #00d400; font-weight: bold');
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');

            this.cached();
            this.initiateActions();
            this.generateUsers();
            this.generateItems();
            this.generatePosUsers();
            this.generatePosItems();
            this.generatePosLog();
            this.itemSelectControls();
            this.calculateGoals();
            this.goSudo();
            // this.db.posLog().remove();
        },

        cached() {
            // window.localStorage.removeItem('goalProfit');
            // console.log(window.localStorage.getItem('goalProfit'));
            window.localStorage.setItem('goalProfit', 250);
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');

            this.alerts =  {
                noUsers: document.querySelector('[data-label="alert-noUsers"]'),
            }
            
            this.db = {
                users: TAFFY().store('users'),
                posLog: TAFFY().store('poslog'),
                items: TAFFY().store('items'),
                settings: window.localStorage.setItem('settings', []),
            }

            this.userPane = {
                addPort: document.querySelector('[data-label="addUserPort"]'),
                addBtn: document.querySelector('[data-label="addUser"]'),
                rmBtn: document.querySelector('[data-label="removeUser"]'),
                user: {
                    name: document.querySelector('#addUser-name').value,
                    credit: parseFloat(document.querySelector('#addUser-credit').value),
                    selected: null,
                },
                records: document.querySelector('[data-label="userRecords"]'),
                recordSelected: null,
                topup: {
                    amount: parseFloat(document.querySelector('#topUp-credit').value),
                    addBtn: document.querySelector('[data-label="topUpConfirm"]'),
                }
            };

            this.itemPane = {
                addBtn: document.querySelector('[data-label="AddItem"]'),
                rmBtn: document.querySelector('[data-label="removeItem"]'),
                item: {
                    name: document.querySelector('#AddItem-name').value,
                    price: {
                        single: parseFloat(document.querySelector('#AddItem-priceSingle').value),
                        double: parseFloat(document.querySelector('#AddItem-priceDouble').value),
                        extra: parseFloat(document.querySelector('#AddItem-priceExtra').value),
                    },
                    type: document.querySelector('input[name="itemType"]:checked').value,
                    selected: null,
                },
                records: document.querySelector('[data-label="itemRecords"]'),
                recordSelected: null,
            };

            this.setPane = {
                removeData: {
                    btn: document.querySelector('[data-label="removeData"]'),
                    check: {
                        users: document.querySelector('#removeData-users'),
                        items: document.querySelector('#removeData-items'),
                        posLog: document.querySelector('#removeData-posLog'),
                    }
                },
                backup: {
                    file: document.querySelector('[data-label="fileinput"]'),
                    export: document.querySelector('[data-label="exportBackup"]'),
                    import: document.querySelector('[data-label="importBackup"]'),
                },
                sudo: {
                    goSudo: document.querySelector('[data-label="goSudo"]'),
                    noSudo: document.querySelector('[data-label="noSudo"]'),
                    pw: document.querySelector('#sudo-password').value,
                },
                reload: document.querySelector('[data-label="dataReload"]'),
            }

            this.pos = {
                users: document.querySelector('[data-label="posUsers"]'),
                userSelected: null,
                items: document.querySelector('[data-label="posItems"]'),
                itemSelected: null,
                selectAmount: {
                    window: document.querySelector('[data-label="posAmount"]'),
                    single: document.querySelector('[data-label="posAmount"] .flex-grid .pos-el:nth-child(1)'),
                    double: document.querySelector('[data-label="posAmount"] .flex-grid .pos-el:nth-child(2)'),
                    extra: document.querySelector('[data-label="posAmount"] .flex-grid .pos-el:nth-child(3)'),
                    selected: 1,
                } ,
                btnConfirm: document.querySelector('[data-label="posConfirm"]'),
                btnCancel: document.querySelector('[data-label="posCancel"]'),
                calculate: {
                    newCreditStatus: 0,
                    toPay: 0,
                },
                records: document.querySelector('[data-label="posLog"]'),
                displayArea: document.querySelector('[data-label="posCalulateArea"]'),
            }

            this.goals =  {
                profit: {
                    circle: document.querySelector('[data-label="goalProfit"] svg path'),
                    elCounter: document.querySelector('[data-label="goalProfit"] .elCounter'),
                    count: 0,
                }
            }

            this.ui =  {
                tabControls: document.querySelectorAll('[data-label="mainNav"] #nav-tab li'),
                itemSelectControlsArray: document.querySelectorAll('.item-select-control'),
            }

            let leiding = [],
                hasToPay = '',
                personIndex,
                selectedDrank,
                selectedDrankAmount,
                selectedDrankIsMix,
                selectedDrankMix,
                leidingCurrentAmount,
                newAmount,
                intrest = 2,
                adminPasswordDefault = a('stamvader'),
                adminLoggedIn = false,
                newAdminPassword,
                toastIndex = 0;

            this.tempStr = '';

            if (window.localStorage.getItem('goalProfit') == null) {
                window.localStorage.setItem('goalProfit', 0);
            }
        },

        setTime() {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            this.now = new Date()
            this.moment = {
                dd: addZero(this.now.getDate()),
                mm: addZero(this.now.getMonth() + 1),
                yyyy: this.now.getFullYear(),
                hh: addZero(this.now.getHours()),
                nn: addZero(this.now.getMinutes()),
            }
        },

        initiateActions() {
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');
            
            this.ui.tabControls.forEach((el) => {
                el.addEventListener('click', () => {
                    this.ui.itemSelectControlsArray.forEach((el) => {
                        el.classList.add('d-none');
                    })
                })
            })

            if (this.db.users().get().length <= 0) {
                this.alerts.noUsers.classList.remove('d-none')
                this.alerts.noUsers.classList.add('d-flex')
            };

            this.userPane.addBtn.addEventListener('click', () => {this.addUser()});
            this.userPane.rmBtn.addEventListener('click', () => {this.removeUser()});
            this.userPane.topup.addBtn.addEventListener('click', () => {this.topUp()});

            this.itemPane.addBtn.addEventListener('click', () => {this.addItem()});
            this.itemPane.rmBtn.addEventListener('click', () => {this.removeItem()});

            this.pos.selectAmount.single.addEventListener('click', () => {
                    this.pos.selectAmount.selected = 1;
                    $('#modalPosConfirm').modal('show');
                    this.pos.selectAmount.window.classList.add('d-none');
                    this.generatePosPrice();
                }
            );
            this.pos.selectAmount.double.addEventListener('click', () => {
                    this.pos.selectAmount.selected = 2;
                    $('#modalPosConfirm').modal('show');
                    this.pos.selectAmount.window.classList.add('d-none');
                    this.generatePosPrice();
                }
            );
            this.pos.selectAmount.extra.addEventListener('click', () => {
                    this.pos.selectAmount.selected = 3;
                    $('#modalPosConfirm').modal('show');
                    this.pos.selectAmount.window.classList.add('d-none');
                    this.generatePosPrice();
                }
            );

            this.pos.btnConfirm.addEventListener('click', () => {this.posPay(this.userPane.user.selected, this.pos.calculate.newCreditStatus, this.pos.calculate.toPay)});
            this.pos.btnCancel.addEventListener('click', () => {this.readyState()});
            
            this.setPane.removeData.btn.addEventListener('click', () => {this.removeData()});
            this.setPane.backup.export.addEventListener('click', () => {
                createToast('Backup', 'Uw gegevens worden klaargemaakt')
                this.exportBackup();
            });
            this.setPane.backup.import.addEventListener('click', () => {this.importBackup()});

            this.setPane.sudo.goSudo.addEventListener('click', () => {this.goSudo()});
            this.setPane.sudo.noSudo.addEventListener('click', () => {
                this.noSudo();
                createToast('Sudo', 'Je bent afgemeld');
            });
            this.setPane.reload.addEventListener('click', () => {
                this.readyState();
                this.cached();
                createToast('Gegevens herladen', 'Gegevens succesvol ingeladen');
            });
        },

        itemSelectControls(state) {
            state = state;
            if (state = 'toggle') {
                this.ui.itemSelectControlsArray.forEach(el => {
                    el.classList.toggle('d-none');
                });
            } else if (state = 'hide') {
                this.ui.itemSelectControlsArray.forEach(el => {
                    el.classList.add('d-none');
                });
            } else if (state = 'show') {
                this.ui.itemSelectControlsArray.forEach(el => {
                    el.classList.remove('d-none');
                });
            } else if (state !== 'toggle' && state !== 'hide' && state !== 'show') {
                console.log('\tstate was not set properly')
            }
        },

        readyState() {
            if (this.db.users().get().length <= 0) {
                this.alerts.noUsers.classList.remove('d-none')
                this.alerts.noUsers.classList.add('d-flex')
            };
            $('#modalPosConfirm').modal('hide');
            $('#carouselPosSteps').carousel(0);
            this.generateUsers();
            this.generateItems();
            this.generatePosUsers();
            this.generatePosItems();
            this.generatePosLog();
            this.calculateGoals();
            if (this.userPane.recordSelected !== null) {
                this.userPane.recordSelected.classList.remove('active');
            };
            if (this.itemPane.recordSelected !== null) {
                this.itemPane.recordSelected.classList.remove('active');
            };
            this.pos.selectAmount.selected = 1;
            this.pos.selectAmount.window.classList.add('d-none');
            // this.pos.displayArea.innerHTML = '';
            this.itemSelectControls('hide');
            // this.cached();
            document.querySelector('#modalPosConfirm .modal-content').classList.remove('modal-danger');
            this.setPane.removeData.check.users.checked == false;
            this.setPane.removeData.check.items.checked == false;
            this.setPane.removeData.check.posLog.checked == false;
        },

        addUser() {
            this.userPane.user.name = document.querySelector('#addUser-name').value;
            this.userPane.user.credit = document.querySelector('#addUser-credit').value; 

            this.db.users.insert({
                name: this.userPane.user.name, 
                credit: parseFloat(this.userPane.user.credit)
            });
            this.readyState();
            this.alerts.noUsers.classList.remove('d-flex');
            this.alerts.noUsers.classList.add('d-none');
        },

        generateUsers() {
            this.userPane.records.innerHTML = '';
            if (this.db.users().get().length != 0) {
                this.db.users().order("date desc").each((r, index) => {
                    let tr = document.createElement('tr');
                    if (r.credit <= 0) {tr.classList.add('user-credit-neg')};
                    tr.innerHTML = `
                        <td>${r.name}</td>
                        <td><span>€${r.credit}</span></td>
                    `;
                    tr.addEventListener('click', () => {
                        if (tr.classList.contains('active')) {
                            tr.classList.remove('active');
                            this.ui.itemSelectControlsArray.forEach(el => {
                                el.classList.add('d-none');
                            });
                        } else {
                            this.userPane.recordSelected = document.querySelector('[data-label="userRecords"] tr.active');
                            if (this.userPane.recordSelected !== null) {
                                this.userPane.recordSelected.classList.remove('active');
                            }
                            tr.classList.add('active');
                            this.ui.itemSelectControlsArray.forEach(el => {
                                el.classList.remove('d-none');
                            });
                        }
                        this.userPane.user.selected = r.___id;
                    });
                    this.userPane.records.appendChild(tr);
                });
            }
        },

        removeUser() {
            document.querySelector('[data-label="userRecords"] tr.active').outerHTML = '';
            this.db.users({___id: this.userPane.user.selected}).remove();
            this.readyState();
        },

        topUp() {
            this.userPane.topup.amount = parseFloat(document.querySelector('#topUp-credit').value);
            let creditCurrent = this.db.users(this.userPane.user.selected).get()[0].credit;
            this.db.users(this.userPane.user.selected).update({credit: parseFloat(creditCurrent) + this.userPane.topup.amount});
            this.readyState(); 
            createToast('Topup gelukt!', `€${this.userPane.topup.amount} tegoed toegevoegd door ${this.db.users(this.userPane.user.selected).get()[0].name}`)
        },

        addItem() {
            this.itemPane.item.name = document.querySelector('#AddItem-name').value;
            this.itemPane.item.type = document.querySelector('input[name="itemType"]:checked').value;

            this.itemPane.item.price.single = document.querySelector('#AddItem-priceSingle').value;
            this.itemPane.item.price.double = document.querySelector('#AddItem-priceDouble').value;
            this.itemPane.item.price.extra = document.querySelector('#AddItem-priceExtra').value;

            this.db.items.insert({
                name: this.itemPane.item.name, 
                type: parseFloat(this.itemPane.item.type),
                price: [parseFloat(this.itemPane.item.price.single), parseFloat(this.itemPane.item.price.double), parseFloat(this.itemPane.item.price.extra)]
            });
            this.generateItems();
            this.generatePosItems();
        },

        generateItems() {
            this.itemPane.records.innerHTML = '';
            let priceOutput = '';
            this.db.items().each((r, index) => {
                let tr = document.createElement('tr');
                if (r.type !== 1 && r.type !== 5) {
                    priceOutput = `<strong>Enkel:</strong> €${r.price[0]} <strong class="ml-3">Dubbel:</strong> €${r.price[1]} <strong class="ml-3">Extra:</strong> €${r.price[2]}`
                } else {
                    priceOutput = `€${r.price[0]}`
                }
                switch(r.type){
                    case 1:
                        typeOutput = "Fris/Bier";
                        break;
                    case 2:
                        typeOutput = "Shotje";
                        break;
                    case 3:
                        typeOutput = "Sterk";
                        break;
                    case 4:
                        typeOutput = "Cocktail";
                        break;
                    case 5:
                        typeOutput = "Snack";
                        break;
                }
                tr.innerHTML = `
                    <td>${r.name}</td>
                    <td>${typeOutput}</td>
                    <td>${priceOutput}</td>
                `;
                tr.addEventListener('click', () => {
                    if (tr.classList.contains('active')) {
                        tr.classList.remove('active');
                        this.ui.itemSelectControlsArray.forEach(el => {
                            el.classList.add('d-none');
                        });
                        
                    } else {
                        this.itemPane.recordSelected = document.querySelector('[data-label="itemRecords"] tr.active');
                        if (this.itemPane.recordSelected !== null) {
                            this.itemPane.recordSelected.classList.remove('active');
                        }
                        tr.classList.add('active');
                        this.ui.itemSelectControlsArray.forEach(el => {
                            el.classList.remove('d-none');
                        });
                    }
                    this.itemPane.item.selected = r.___id;
                });
                this.itemPane.records.appendChild(tr);
            });
        },

        removeItem() {
            document.querySelector('[data-label="itemRecords"] tr.active').outerHTML = '';
            this.db.items({___id: this.itemPane.item.selected}).remove();
        },

        removeData() {
            let actionTaken = false;
            if (this.setPane.removeData.check.users.checked == true) {
                this.db.users().remove();
                actionTaken = true;
            }
            if (this.setPane.removeData.check.items.checked == true) {
                this.db.items().remove();
                actionTaken = true;
            }
            if (this.setPane.removeData.check.posLog.checked == true) {
                this.db.posLog().remove();
                actionTaken = true;
            }

            if (actionTaken == true) {
                $('#modalDataRemove').modal('hide');
                createToast('Gegevens', 'Gegevens succesvol verwijderd');
                this.readyState();
            } else {
                createToast('Gegevens', 'Er werden geen gegevens verwijderd. Selecteerd eerst een type om te verwijderen.')
            }
            
            this.readyState();
        },

        generatePosLog() {
            this.pos.records.innerHTML = '';
            this.goals.profit.count = 0
            this.db.posLog().order("timeUnix asec").each((r, index) => {
                let amount = '';
                if (r.amount == 2) {
                    amount = `<br><small>dubbel</small>`
                } else if (r.amount == 3) {
                    amount = `<br><small>extra</small>`
                }
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="pl-4 fontw-400">
                        ${r.time}<br>
                        <small>${r.date}</small>
                    </td>
                    <td>${r.user}</td>
                    <td>
                        ${r.item}
                        ${amount}
                    </td>
                    <td class="pr-4">€${r.credit}</td>
                `;
                // this.pos.records.appendChild(tr);
                this.pos.records.insertBefore(tr, this.pos.records.childNodes[0]);
                this.goals.profit.count = this.goals.profit.count + r.credit
            });
        },

        generatePosUsers() {
            this.pos.users.innerHTML = '';
            if (this.db.users().get().length != 0) {
                this.db.users().order("name desc").each((r, index) => {
                    let div = document.createElement('div');
                    div.classList.add('flex-grid-item', 'pos-el');
                    div.innerHTML = `
                        <h3>${r.name}</h3>
                        <small>€${r.credit}</small>
                    `;
                    div.addEventListener('click', () => {
                        if (div.classList.contains('active')) {
                            div.classList.remove('active');
                        } else {
                            this.pos.userSelected = document.querySelector('[data-label="posUsers"] div.active');
                            if (this.pos.userSelected !== null) {
                                this.pos.userSelected.classList.remove('active');
                            }
                            div.classList.add('active');
                        }
                        this.userPane.user.selected = r.___id;
                        $('#carouselPosSteps').carousel('next');
                    });
                    this.pos.users.appendChild(div);
                });
            }
        },

        generatePosItems() {
            this.pos.items.innerHTML = '';
            this.db.items().order("name desc").each((r, index) => {
                let div = document.createElement('div');
                div.classList.add('flex-grid-item', 'pos-el');
                div.innerHTML = `
                    <h3>${r.name}</h3>
                    <small>€${r.price[0]}</small>
                `;
                div.addEventListener('click', () => {
                    if (div.classList.contains('active')) {
                        div.classList.remove('active');
                        this.pos.selectAmount.window.classList.add('d-none');
                    } else {
                        this.pos.itemSelected = document.querySelector('[data-label="posItems"] div.active');
                        if (this.pos.itemSelected !== null) {
                            this.pos.itemSelected.classList.remove('active');
                        }
                        div.classList.add('active');
                    }
                    this.itemPane.item.selected = r.___id;
                    if (r.type !== 1 && r.type !== 5) {
                        if (div.classList.contains('active') == true) {
                            this.pos.selectAmount.window.classList.remove('d-none');
                        }
                    } else {
                        $('#modalPosConfirm').modal('show');
                        this.generatePosPrice()
                        this.pos.selectAmount.window.classList.add('d-none');
                    }
                });
                this.pos.items.appendChild(div);
            });
        },

        generatePosPrice() {
            let price;
            let credit = this.db.users(this.userPane.user.selected).get()[0].credit;
            if (this.pos.selectAmount.selected == 1) {
                price = this.db.items(this.itemPane.item.selected).get()[0].price[0];
            } else if (this.pos.selectAmount.selected == 2) {
                price = this.db.items(this.itemPane.item.selected).get()[0].price[1];
            } else if (this.pos.selectAmount.selected == 3) {
                price = this.db.items(this.itemPane.item.selected).get()[0].price[2];
            };

            this.pos.calculate.toPay = price;
            this.pos.calculate.newCreditStatus = credit - this.pos.calculate.toPay;
            // this.posPay(this.userPane.user.selected, 1222);

            if (credit >= price) {                
                this.pos.displayArea.innerHTML = `
                    <h4 class="text-left mb-0">${this.db.items(this.itemPane.item.selected).get()[0].name}</h4>
                    <p class="mb-0 text-left"><span class="fontw-500">€${price}</span></p>
                    <hr>
                    <p class="text-right text-modern">totaal <span class="fontw-500">€${price}</span></p>
                `;
                this.pos.btnConfirm.classList.add('btn-blue');
                this.pos.btnConfirm.classList.remove('btn-danger');
                this.pos.btnConfirm.classList.innerHTML = `<i data-feather="check"></i>kopen`;
                feather.replace();
            } else {
                document.querySelector('#modalPosConfirm .modal-content').classList.add('modal-danger');
                this.pos.calculate.toPay = (this.pos.calculate.toPay * 1.2).toFixed(2);
                this.pos.calculate.newCreditStatus = credit - this.pos.calculate.toPay;
                this.pos.displayArea.innerHTML = `
                    <h4 class="text-left mb-0">${this.db.items(this.itemPane.item.selected).get()[0].name}</h4>
                    <p class="mb-0 text-left "><span class="fontw-500">${price}</span>€ + 20% intrest</p>
                    <hr>
                    <p class="text-right text-modern">totaal <span class="fontw-500">€${this.pos.calculate.toPay}</span></p>
                `;
                this.pos.btnConfirm.classList.add('btn-danger');
                this.pos.btnConfirm.classList.remove('btn-blue');
                this.pos.btnConfirm.classList.innerHTML = `<i data-feather="check"></i>toch kopen`;
                feather.replace();

            }
        },

        posPay(selectedUser, newCredit, pay) {
            this.setTime();
            this.db.users(selectedUser).update({credit: parseFloat(newCredit)});

            this.db.posLog.insert({
                timeUnix: new Date().getTime(),
                time: `${this.moment.hh}:${this.moment.nn}`,
                date: `${this.moment.dd}/${this.moment.mm}/${this.moment.yyyy}`,
                user:  this.db.users(this.userPane.user.selected).get()[0].name,
                item:  this.db.items(this.itemPane.item.selected).get()[0].name,
                amount: parseFloat(this.pos.selectAmount.selected),
                credit: parseFloat(pay),
            })
            
            let currentCreditStateForToast;
            if(parseFloat(newCredit) <= 0) {
                currentCreditStateForToast = `<br><strong>Je staat ${parseFloat(newCredit).toFixed(2)} in het rood</strong>, zuiver je toegoed aan!`;
            } else {
                currentCreditStateForToast = `<br><strong>€${parseFloat(newCredit).toFixed(2)} toegoed over</strong>`
            };
            
            
            this.readyState();
            document.querySelector('#modalPosConfirm .modal-content').classList.remove('modal-danger');
            this.calculateGoals();
            
            createToast(
                `Item verkocht`, 
                `${this.db.users(this.userPane.user.selected).get()[0].name} heeft ${this.db.items(this.itemPane.item.selected).get()[0].name} gekocht voor €${parseFloat(pay)}. ${currentCreditStateForToast}`)
        },

        goSudo() {
            
            this.setPane.sudo.pw = document.querySelector('#sudo-password').value;

            if (a(this.setPane.sudo.pw) == a('stamvader') || getCookie('sudo') == 'true') {
                document.querySelector('#sudo-password').value = '';
                document.body.setAttribute('data-sudo-mode', 'true');
                createCookie('sudo', true)
                errorText('sudoFalse', '');
                $('#modalGoSudo').modal('hide');
                createToast('sudo', 'Je bent nu aangemeld');
            } else {
                errorText('sudoFalse', 'Het opgegeven wachtwoord was fout');
            }
        },

        noSudo() {
            createCookie('sudo', false, 0);
            document.body.setAttribute('data-sudo-mode', 'false');
        },

        exportBackup() {
            let tempStr1 = '', tempStr2 = '', tempStr3 = '';
            this.db.posLog().each((r) => {
                tempStr1 += `
,{
    "timeUnix": ${r.timeUnix},
    "time": "${r.time}",
    "date": "${r.date}",
    "user": "${r.user}",
    "item": "${r.item}",
    "amount": ${r.amount},
    "credit": ${r.credit}
}`
            });

            this.db.items().each((r) => {
                tempStr2 += `
,{
    "name": "${r.name}",
    "type": ${r.type},
    "price": [${r.price}]
}`
                }
            );

            this.db.users().each((r) => {
                tempStr3 += `
,{
    "name": "${r.name}",
    "credit": ${r.credit}
}`
                }
            );

            const result = `
[{
    "posLog": [
        ${tempStr1.slice(2)}],
    "items": [
        ${tempStr2.slice(2)}],
    "users": [
        ${tempStr3.slice(2)}]
}]
            `;

            this.setTime();
            const blob = new Blob([result], {type: 'application/javascript'});
            saveAs(blob, `barbord_backup_${this.moment.dd}${this.moment.mm}${this.moment.yyyy}_${this.moment.hh}${this.moment.nn}.json`)
        },

        importBackup() {
            function loadFile() {
                var input, file, fr;
            
                if (typeof window.FileReader !== 'function') {
                    // alert("The file API isn't supported on this browser yet.");
                    createToast('Backup', 'De vereiste API wordt niet ondersteund')
                    return;
                }
            
                input = document.querySelector('[data-label="fileinput"]');
                let filename = input.value.split("\\").pop();
            
                if (!input) {createToast('Backup', 'Fout bij het importeren')}
                else if (!input.files) {createToast('Backup', 'Deze browser ondersteund deze functie niet')}
                else if (!input.files[0]) {createToast('Backup', 'Upload eerst een bestand')}
                else {
                    file = input.files[0];
                    fr = new FileReader();
                    fr.onload = receivedText;
                    fr.readAsText(file);
                    $('#modalDataImport').modal('hide')
                    createToast('Backup', 'Terugzetten gegevens gelukt')
                }
            
                
                function receivedText(e) {
                    let lines = e.target.result;
                    var newArr = JSON.parse(lines);

                    this.db = {
                        users: TAFFY().store('users'),
                        posLog: TAFFY().store('poslog'),
                        items: TAFFY().store('items'),
                    }

                    function addZero(i) {
                        if (i < 10) {
                            i = "0" + i;
                        }
                        return i;
                    }
                    this.now = new Date()
                    this.moment = {
                        dd: addZero(this.now.getDate()),
                        mm: addZero(this.now.getMonth() + 1),
                        yyyy: this.now.getFullYear(),
                        hh: addZero(this.now.getHours()),
                        nn: addZero(this.now.getMinutes()),
                    }

                    this.db.posLog().remove();
                    newArr[0].posLog.forEach((r) => {
                        this.db.posLog.insert({
                            timeUnix: r.timeUnix,
                            time: r.time,
                            date: r.date,
                            user:  r.user,
                            item:  r.item,
                            amount: r.amount,
                            credit: r.credit,
                        })
                    })
                    this.db.items().remove();
                    newArr[0].items.forEach((r) => {
                        this.db.items.insert({
                            name: r.name, 
                            type: r.type,
                            price: r.price
                        });
                    })
                    this.db.users().remove();
                    newArr[0].users.forEach((r) => {
                        this.db.users.insert({
                            name: r.name, 
                            credit: r.credit
                        });
                    })

    
                    // console.log(newArr[0].dbFirst);
            
                }
            }

            loadFile();
            this.readyState();
        },

        calculateGoals() {
            this.goals.profit.elCounter.innerHTML = `€${this.goals.profit.count.toFixed(2)}`;
            let percent = (this.goals.profit.count / window.localStorage.getItem('goalProfit'))
            console.log(percent)
            this.goals.profit.circle.setAttribute('style', `stroke-dasharray: ${percent*299}, 298.493; stroke: hsl(214, 100%, ${100 - (percent * 100)}%);`);
        },
    }

    app.initialize();
})()

function replaceElement(element, content) {
    element = document.querySelectorAll(`[data-replace="${element}"]`);
    element.forEach((el) => {
        el.outerHTML = content;
    })
}

function fillElement(element, content) {
    element = document.querySelectorAll(`[data-fill="${element}"]`);
    element.forEach((el) => {
        el.innerHTML = content;
    })
}

function errorText(element, content) {
    element = document.querySelectorAll(`[data-error="${element}"]`);
    element.forEach((el) => {
        // el.style.display = 'block !important';
        el.innerHTML = content;
    })
}

function createToast(title, message) {
    console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');
    console.log(toastIndex);

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
    toastIndex ++;

    toast.classList.add('toast', 'animated', 'fadeInRight', 'faster');
    toast.setAttribute('data-toast', `toastIndex${toastIndex}`);
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
    $(`[data-toast="toastIndex${toastIndex}"]`).toast('show');
};