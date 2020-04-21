export const test = () => {
    logStatus('test', 'functions.js')
}

export const logStatus = (functionName, file) => {
    if (file != undefined) {console.log('\n' + `%c[service] ${file} ${functionName}() running! \n` + ' ', 'color: #00d400; font-weight: bold')}
    console.log(`%c[service] ${functionName}()`, 'font-weight: bold');
}

export const fetchAPI = async (url) => {
    try {
        let response = await fetch(url)
        let data = await response.json();
        return data
    }
    catch {
        throw new Error('nieje mut')
    }
}

export const generateID = () => {
    return `${(Math.random()*100000).toFixed(0)}${new Date().getMilliseconds()}`;
}

export class callerName {
    constructor(file) {
        this.file = file + '.js';
    }
    
    init() {
        console.log(`\n%c[service] ${this.file} running! \n` + ' ', 'color: #00d400; font-weight: bold')
    }
    
    add(funct) {
        console.log(`%c[service] ${this.file}:${funct}()`, 'font-weight: bold');
    }
    
    log(logged) {
        console.log('\t' + logged);
    }
}