(() => {
    const sesam = {
        initialize() {
            console.log('\n' + `%c[service] sesam.js ${arguments.callee.name}() running! \n` + ' ', 'color: #00d400; font-weight: bold');
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');
            this.cached();
    
            this.sesamTrigger.length !== 0 ? console.log(`\sesam triggers available`) : console.log(`\tno collapse triggers`);
            this.sesamTrigger.forEach((trigger) => {
                trigger.addEventListener("click", (() => {
                    this.collapseDo(trigger.dataset.sesamTrigger);
                }));
    
                if (trigger.classList.contains('sesam-hidden') == false) {
                    trigger.classList.add('sesam-hidden');
                }
                
                if (trigger.classList.contains('sesam') == false) {
                    trigger.classList.add('sesam');
                }
            });
    
            this.sesamTarget.forEach((item) => {
                if (item.classList.contains('sesam') == false) {
                    item.classList.add('sesam');
                }
    
                if (item.classList.contains('sesam-hidden') == false) {
                    item.classList.add('sesam-hidden');
                }
            })
        },
    
        cached() {
            console.log(`%c[service] ${arguments.callee.name}()`, 'font-weight: bold');
    
            // Put cache elements here
            this.sesamTrigger = document.querySelectorAll('[data-sesam-trigger]');
            this.sesamTarget = document.querySelectorAll('[data-sesam-target]');
            this.parent = '';
            this.targetName = '';
            this.trigger;
        },
    
        collapseDo(target) {
            console.log(`%c[service] ${arguments.callee.name}(${target})`, 'font-weight: bold');
    
            this.targetName = target;
            target = document.querySelector(`[data-sesam-target='${target}']`);
    
            this.parent = target.dataset.sesamParent;
            this.parent = document.querySelectorAll(`[data-sesam-group="${this.parent}"] .sesam`);
            this.trigger = document.querySelector(`[data-sesam-trigger="${this.targetName}"]`);
    
            // COLLAPSE TRIGGER
            if (this.trigger.classList.contains('sesam-show') == false) {
                this.itemShow(this.trigger);

                // HIDE ALSO OTHER ELEMENTS
                this.parent.forEach((item) => {
                    if (item.dataset.sesamTrigger !== this.targetName) {
                        this.itemHide(item);
                    }
                });
            } else {
                this.itemHide(this.trigger);
            }
    
            // COLLAPSE TARGET
            if (target.classList.contains('sesam-show') == false) {
                this.itemShow(target)
            } else {
                this.itemHide(target)

                // HIDE ALSO OTHER ELEMENTS
                this.parent.forEach((item) => {
                    if (item.dataset.sesamTarget !== this.targetName) {
                        this.itemHide(item);
                    }
                });
            }
        },

        itemHide(input) {
            input.classList.remove('sesam-show');
            input.classList.add('sesam-hidden');
        },

        itemShow(input) {
            input.classList.add('sesam-show');
            input.classList.remove('sesam-hidden');
        },

        hideChildren(input) {
            // input = the dataset for trigger or target
            this.parent.forEach((item) => {
                if (item.datatset.input !== this.targetName) {
                    this.itemHide(item);
                }
            });
        },

        ifClassFalseAddClass(itemToApply = item, checkThisClass) {
            if (itemToApply.classList.contains(checkThisClass) == false) {
                itemToApply.classList.add(checkThisClass);
            }
        }
    }

    sesam.initialize();
})()