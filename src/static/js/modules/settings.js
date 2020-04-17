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
    },
    
    cache() {
        logStatus('cache');
        this.signInForm = document.querySelector('#adminSignIn');
    },
    
    addListeners() {
        logStatus('addListeners', 'settings.js');
        
        this.signInForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('\tsombody tried to login')
            
            this.checkPassword()
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
    }
}

settings.initialize();