import {app, callerName, dataExport} from './index.js';

const status = new callerName('settings');

export const settings = {
    initialize() {
        status.init();
        
        this.cache();
        this.chart();
        
        if (getCookie('sudo') == 'true') {
            document.body.setAttribute('data-sudo-mode', 'true');
        }
        if (readCookie('darkmode') == null) {
            createCookie('darkmode', false);
        }
        
        if (getCookie('darkmode') == 'true') {
            document.body.setAttribute('dark-mode', 'true');
        } else {
            document.body.setAttribute('dark-mode', 'false');
        }
    },
    
    cache() {
        status.add('cache');
        
        this.signInForm = document.querySelector('#adminSignIn');
        this.changePasswordForm = document.querySelector('#adminChangePassword');
        this.tabFunctions = document.querySelector('#nav-settings [data-label="tabFunctions"]');
        this.dataRemoveForm = document.querySelector('#dataRemoveForm');
    },
    
    addListeners() {
        status.add('addListeners');
        
        this.signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            status.log('sombody tried to login')
            
            let formData = new FormData(this.signInForm);
            const password = formData.get('password')
            
            // empty fields
            app.clearFields(event.target);
            
            this.checkPassword(password);
        })
        
        this.tabFunctions.addEventListener('click', (event) => {
            const targetBtn = event.target.closest('button').dataset.label;
            
            switch (targetBtn) {
                case 'noSudo':
                    this.signOut();
                    break;
                case 'darkMode':
                    this.darkMode();
                    break;
                case 'dataReload':
                    app.readyState();
                    app.createToast('Barbord', 'Alle gegevens werden succesvol ingeladen')
                    break;
                default:
                    status.log('you didn\'t hit an available button')
                    break;
            }
        })
         
        this.changePasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = new FormData(this.changePasswordForm);
            // formData.get('newPassword')
            
            app.errorText('currentPassword', '');
            
            if (readCookie('password') == null && formData.get('currentPassword') == 'stamvader') {
                // als password niet ingesteld is
                status.log(`passwoord (${formData.get('currentPassword')}) is juist, kan veranderen`);
                this.changePassword(formData.get('newPassword'))
            } else if (readCookie('password') !== null && a(formData.get('currentPassword')) == getCookie('password')) {
                // als password ingesteld is
                status.log(`passwoord (${formData.get('currentPassword')}) is juist, kan veranderen`)
                this.changePassword(formData.get('newPassword'))
            } else {
                status.log('something went wrong')
                app.errorText('currentPassword', 'Het huidige wachtwoord is niet correct, probeer opnieuw');
            }
            
            // empty fields
            app.clearFields(event.target);
        })
        
        this.dataRemoveForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            status.log('data will ben removed')
            app.createToast('Gegevens', 'Gegevens worden verwijderd')
            
            await this.dataRemove();
        })
    },
    
    checkPassword(entry) {
        status.add('checkPassword');
        
        status.log('checking your password')
        status.log(`this password was entered: ${a(entry)}`);
        
        if (readCookie('password') == null && entry == 'stamvader') {
            status.log('the entered password was correct');
            this.signIn()
        } else if (readCookie('password') !== null && a(entry) == getCookie('password')) {
            status.log('the entered password was correct');
            this.signIn()
        } else {
            status.log('the entered password is not correct');
            app.errorText('sudoFalse', 'Het opgegeven wachtwoord is niet juist');
        }
    }, 
    
    signIn() { 
        status.add('signIn');
        
        document.body.setAttribute('data-sudo-mode', 'true');
        createCookie('sudo', true)
        
        app.errorText('sudoFalse', '');
        $('#modalGoSudo').modal('hide');
        app.createToast('sudo', 'Je bent nu aangemeld');
    },
    
    signOut() {
        status.add('signOut');
        
        createCookie('sudo', false, 0);
        document.body.setAttribute('data-sudo-mode', 'false');
    },
    
    changePassword(entry) {
        status.add('changePassword');
        
        createCookie('password', a(entry));
        $('.modal').modal('hide');
        $('#modalGoSudo').modal('show');
        this.signOut();
    },
    
    chart() {
        status.add('chart');
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            data.addRows([
                ['Inkomsten', 300],
                ['Verkoop', 213],
            ]);

            // Set chart options
            var options = {'title':'Verkoop',
                        'width':400,
                        'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    },
    
    async dataRemove() {
        let formData = new FormData(await this.dataRemoveForm);
        const options = {
            users: formData.get('optionRemoveData-users'),
            items: formData.get('optionRemoveData-items'),
            poslog: formData.get('optionRemoveData-posLog'),
            backup: formData.get('optionBackup')
        }
        
        console.log(options);
        
        if (options.backup == 'true') await dataExport.export();
        
        if (options.users == 'true') await app.dexieDeleteUsers();
        if (options.items == 'true') await app.dexieDeleteItems();
        if (options.poslog == 'true') await app.dexieDeleteLogs();
        
        app.readyState();
    },
    
    darkMode() {
        status.add('darkMode');
        
        if (getCookie('darkmode') == 'true') {
            createCookie('darkmode', false)
            document.body.setAttribute('dark-mode', 'false');
        } else {
            createCookie('darkmode', true)
            document.body.setAttribute('dark-mode', 'true');
        }
    }
}

settings.initialize();