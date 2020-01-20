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

            // this.db.posLog().remove();
        },

        cached() {
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');

            this.alerts =  {
                noUsers: document.querySelector('[data-label="alert-noUsers"]'),
            }

            this.db = {
                users: TAFFY().store('users'),
                posLog: TAFFY().store('poslog'),
                items: TAFFY().store('items'),
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

            this.toastIndex = 0;
            this.tempStr = '';
        },

        moment() {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            this.now = new Date()
            this.date = {
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
        },

        itemSelectControls(state) {
            // console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');
            console.log(`state: ${state}`)
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
            $('#modalPosConfirm').modal('hide');
            $('#carouselPosSteps').carousel(0);
            this.generateUsers();
            this.generateItems();
            this.generatePosUsers();
            this.generatePosItems();
            this.generatePosLog();
            if (this.userPane.recordSelected !== null) {
                this.userPane.recordSelected.classList.remove('active');
            };
            if (this.itemPane.recordSelected !== null) {
                this.itemPane.recordSelected.classList.remove('active');
            };
            this.pos.selectAmount.selected = 1;
            this.pos.displayArea.innerHTML = '';
            this.itemSelectControls('hide');
            // this.cached();
        },

        createToast(title, message) {
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');

            let toast = document.createElement('div');
            this.toastIndex ++;
        
            toast.classList.add('toast', 'animated', 'fadeInRight', 'faster');
            toast.setAttribute('data-toast', `toastIndex${this.toastIndex}`);
            toast.setAttribute('data-delay', `3500`);
            toast.setAttribute('role', `alert`);
            toast.setAttribute('aria-atomic', `true`);
            toast.setAttribute('aria-live', `assertive`);
        
            toast.innerHTML = `
                <div class="toast-header">
                    <div class="icon-md mr-2"><i data-feather="bell"></i></div>
                    <strong class="mr-auto">${title}</strong>
                    <small class="text-muted d-none">just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <div class="icon-md"><i data-feather="x"></i></div>
                    </button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            `
        
            toast.addEventListener('animationend', function() {toast.classList.add('animated', 'fadeOutRight', 'delay-3s')})
        
            document.querySelector('#toastContainer').appendChild(toast);
            feather.replace();
            $(`[data-toast="toastIndex${this.toastIndex}"]`).toast('show');
        },

        addUser() {
            this.userPane.user.name = document.querySelector('#addUser-name').value;
            this.userPane.user.credit = document.querySelector('#addUser-credit').value; 

            this.db.users.insert({name: this.userPane.user.name, credit: parseFloat(this.userPane.user.credit)});
            this.generateUsers();
            this.generatePosUsers();
        },

        generateUsers() {
            this.userPane.records.innerHTML = '';
            this.db.users().order("date desc").each((r, index) => {
                let tr = document.createElement('tr');
                if (r.credit <= 0) {tr.classList.add('user-credit-neg')};
                tr.innerHTML = `
                    <td>${r.name}</td>
                    <td><span>€${(r.credit).toFixed(2)}</span></td>
                `;
                tr.addEventListener('click', () => {
                    console.log('clicked')
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
        },

        removeUser() {
            console.log(this.userPane.user.selected);
            document.querySelector('[data-label="userRecords"] tr.active').outerHTML = '';
            this.db.users({___id: this.userPane.user.selected}).remove();
        },

        topUp() {
            this.userPane.topup.amount = parseFloat(document.querySelector('#topUp-credit').value);
            let creditCurrent = this.db.users(this.userPane.user.selected).get()[0].credit;
            this.db.users(this.userPane.user.selected).update({credit: parseFloat(creditCurrent) + this.userPane.topup.amount});
            this.readyState();
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
                tr.innerHTML = `
                    <td>${r.name}</td>
                    <td>${r.type}</td>
                    <td>${priceOutput}</td>
                `;
                tr.addEventListener('click', () => {
                    console.log('clicked')
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
            console.log(this.itemPane.item.selected);
            document.querySelector('[data-label="itemRecords"] tr.active').outerHTML = '';
            this.db.items({___id: this.itemPane.item.selected}).remove();
        },

        generatePosLog() {
            this.pos.records.innerHTML = '';
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
            });
        },

        generatePosUsers() {
            this.pos.users.innerHTML = '';
            this.db.users().order("name desc").each((r, index) => {
                let div = document.createElement('div');
                div.classList.add('flex-grid-item', 'pos-el');
                div.innerHTML = `
                    <h3>${r.name}</h3>
                    <small>€${(r.credit).toFixed(2)}</small>
                `;
                div.addEventListener('click', () => {
                    console.log('clicked')
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
                    } else {
                        this.pos.itemSelected = document.querySelector('[data-label="posItems"] div.active');
                        if (this.pos.itemSelected !== null) {
                            this.pos.itemSelected.classList.remove('active');
                        }
                        div.classList.add('active');
                    }
                    this.itemPane.item.selected = r.___id;
                    if (r.type !== 1 && r.type !== 5) {
                        this.pos.selectAmount.window.classList.remove('d-none');
                    } else {
                        $('#modalPosConfirm').modal('show');
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
            } else {
                document.querySelector('#modalPosConfirm .modal-content').classList.add('modal-danger');
                this.pos.calculate.toPay = (this.pos.calculate.toPay * 1.2).toFixed(2);
                this.pos.displayArea.innerHTML = `
                    <h4 class="text-left mb-0">${this.db.items(this.itemPane.item.selected).get()[0].name}</h4>
                    <p class="mb-0 text-left "><span class="fontw-500">${price}</span>€ + 20% intrest</p>
                    <hr>
                    <p class="text-right text-modern">totaal <span class="fontw-500">€${this.pos.calculate.toPay}</span></p>
                `;
            }
        },

        posPay(selectedUser, newCredit, pay) {
            this.moment();
            console.log(typeof newCredit);
            this.db.users(selectedUser).update({credit: parseFloat(newCredit)});

            this.db.posLog.insert({
                timeUnix: new Date().getTime(),
                time: `${this.date.hh}:${this.date.nn}`,
                date: `${this.date.dd}/${this.date.mm}/${this.date.yyyy}`,
                user:  this.db.users(this.userPane.user.selected).get()[0].name,
                item:  this.db.items(this.itemPane.item.selected).get()[0].name,
                amount: parseFloat(this.pos.selectAmount.selected),
                credit: parseFloat(pay),
            })

            this.readyState();
            document.querySelector('#modalPosConfirm .modal-content').classList.remove('modal-danger');
        }
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