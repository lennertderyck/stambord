const logStatus = (functionName, file) => {
    if (file != undefined) {console.log('\n' + `%c[service] ${file} ${functionName}() running! \n` + ' ', 'color: #00d400; font-weight: bold')}
    console.log(`%c[service] ${functionName}()`, 'font-weight: bold');
}

export const settings = {
    initialize() {
        logStatus('initialize', 'settings.js');
        this.cache();
        
        if (getCookie('sudo') == 'true') {
            document.body.setAttribute('data-sudo-mode', 'true');
        }
        
        this.chart();
    },
    
    cache() {
        logStatus('cache');
        this.signInForm = document.querySelector('#adminSignIn');
        this.tabFunctions = document.querySelector('#nav-settings [data-label="tabFunctions"]');
    },
    
    addListeners() {
        logStatus('addListeners', 'settings.js');
        
        this.signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tsombody tried to login')
            
            this.checkPassword()
        })
        
        this.tabFunctions.addEventListener('click', (event) => {
            const targetBtn = event.target.closest('button').dataset.label;
                        
            switch (targetBtn) {
                case 'noSudo':
                    this.signOut();
                    break;
                default:
                    console.log('\tyou didn\'t hit an available button')
                    break;
            }
        })
    },
    
    checkPassword(entry) {
        logStatus('checkPassword', 'settings.js');
        
        console.log('\tchecking your password')
        
        let formData = new FormData(this.signInForm);
        const password = formData.get('password')
        console.log(`\tthis password was entered: ${password}`);
        
        if (a(password) == a('stamvader')) {
            console.log('\tthe entered password was correct');
            this.signIn()
        } else {
            console.log('\tthe entered password is not correct');
            
            // errorText('sudoFalse', 'Het opgegeven wachtwoord was fout');
        }
        
        // if (a(this.setPane.sudo.pw) == a('stamvader') || getCookie('sudo') == 'true') {
        //     document.querySelector('#sudo-password').value = '';
        //     document.body.setAttribute('data-sudo-mode', 'true');
        //     createCookie('sudo', true)
        //     errorText('sudoFalse', '');
        //     $('#modalGoSudo').modal('hide');
        //     createToast('sudo', 'Je bent nu aangemeld');
        // } else {
        //     errorText('sudoFalse', 'Het opgegeven wachtwoord was fout');
        // }
    }, 
    
    signIn() { 
        document.body.setAttribute('data-sudo-mode', 'true');
        createCookie('sudo', true)
        // errorText('sudoFalse', '');
        $('#modalGoSudo').modal('hide');
        // createToast('sudo', 'Je bent nu aangemeld');
    },
    
    signOut() {
        createCookie('sudo', false, 0);
        document.body.setAttribute('data-sudo-mode', 'false');
    },
    
    chart() {
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
    }
}

settings.initialize();