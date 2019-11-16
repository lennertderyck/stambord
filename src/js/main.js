/*
    Get variable from localstorage
    Convert tot array
    List in console

    Push to array
    Convert to string
    Save to localstorage

    .find()
*/
const
    body = document.querySelector("body");
    btnSave = document.querySelector('#createLeiding'),
    btnRmv = document.querySelector('#removeLeiding'),
    inpSaveLeidingNaam = document.querySelector('#leidingNaam'),
    inpSaveLeidingBedrag = document.querySelector('#leidingBedrag');
    buttons = document.querySelector('.buttons'),
    tableLeiding = document.querySelector('#tableLeiding'),
    bordContent = document.querySelector("#home > div > div:nth-child(2)"),
    inpTopUp = document.querySelector('#topUpAmount'),
    errorNewLeiding = document.querySelector('#errorNewLeiding'),
    inpDrankNaam = document.querySelector("#drankNaam"),
    inpDrankMix = document.querySelector("#inputDrankMix"),
    inpDrankAmount = document.querySelector("#inpDrankAmount"),
    inpDrankAmount2 = document.querySelector("#inpDrankAmount2"),
    inpDrankAmount3 = document.querySelector("#inpDrankAmount3"),
    inpDrankColor = document.querySelector("#inpDrankColor"),
    inpAdminPassw = document.querySelector("#inpAdminPassword");

const
    now = new Date(),
    dd = now.getDate(),
    mm = now.getMonth(),
    yyyy = now.getFullYear(),
    hh = now.getHours(),
    nn = now.getMinutes();

let leiding = [],
    hasToPay = '',
    personIndex,
    selectedDrank,
    selectedDrankAmount,
    selectedDrankIsMix,
    selectedDrankMix,
    leidingCurrentAmount,
    newAmount,
    content = 2,
    leidingTegoed = TAFFY().store('leiding-tegoed'),
    records = TAFFY().store('records'),
    dranken = TAFFY().store('dranken'),
    adminPassw = '110a6e0aecf707012331d14f13d4a251b9d392c5317fa39332567ee57a140cc6',
    adminLoggedIn = false;

function initiate() {
    btnSave.addEventListener('click', () => {
        if (inpSaveLeidingNaam.value == '' || inpSaveLeidingBedrag.value == '' ) {
            console.log('lol')
            errorNewLeiding.classList.remove('d-none');
        } else {
            errorNewLeiding.classList.remove('d-none');
            errorNewLeiding.classList.add('d-none');
            leidingTegoed.insert({name: inpSaveLeidingNaam.value, amount: inpSaveLeidingBedrag.value});
            generateUI();
        }
    });

    testLeidingExists();
    generateUI();
    generateRecords();
    generateDrank();
    generateListDranken();

    // Als laatst
    feather.replace();
}

function testLeidingExists() {
    if (leidingTegoed().count() == 0) {
        document.querySelector('#home > div > div:nth-child(2)').classList.add('d-none');
        document.querySelector('#notifNoLeiding').classList.remove('d-none');
    } else {
        document.querySelector('#notifNoLeiding').classList.add('d-none');
        document.querySelector('#home > div > div:nth-child(2)').classList.add('d-none');
        document.querySelector('#home > div > div:nth-child(2)').classList.remove('d-none');
    };
}

function generateUI() {
    let tempStr = '', tableTempStr = '';

    leidingTegoed().each((el) => {
        leidingCurrentAmount = el.amount;
        tempStr += `
            <button class="btn btn-primary txt-item flex-grid-item" onclick="selectPerson('${el.name}', '${el.amount}')">${el.name}</button>
        `;
    
        tableTempStr += `
        <tr>
            <td>${el.name}</td>
            <td>${amount2Eur(el.amount)}</td>
            <td>
                <button class="btn btn-info mr-2" onclick="topUp('${el.name}', ${el.amount})"><i data-feather="dollar-sign"></i>Topup</button>
                <button class="btn btn-danger no-txt" onclick="removePerson('${el.name}')"><i data-feather="trash-2"></i></button>
            </td>
        </tr>
        `;
    });

    buttons.innerHTML = tempStr;
    tableLeiding.innerHTML = tableTempStr;

    testLeidingExists();
    feather.replace();
}

function selectPerson(n, e) {
    hasToPay = n;
    currentAmount = e;
    console.log(`has to pay: ${hasToPay}`);


    if (currentAmount <= 1){
        document.querySelector('#notifCurrentAmount').classList.remove('d-none');
    }

    if (currentAmount > 1) {
        document.querySelector('#notifCurrentAmount').classList.remove('d-none');
        document.querySelector('#notifCurrentAmount').classList.add('d-none');
    }

    document.querySelector("#selectDrank").classList.remove('d-none');

    showCurrentAmount(currentAmount);
    document.querySelector("#selectDrank").scrollIntoView();
}

function removePerson(n) {
    console.log(`remove: ${n}`);
    leidingTegoed({name: n}).remove();
    generateUI();
}

function selectAmount(n) {
    if (currentAmount < 1){
        content = n*1.03;
    } else {
        content = n;
    }

    document.querySelector("#selectContent").classList.add('d-none');
    document.querySelector("#selectDrank").classList.add('d-none');
    document.querySelector("#showCurrentAmount").classList.add('d-none');
    document.querySelector("#notifCurrentAmount").classList.add('d-none');

    if (selectedDrankIsMix == true) {
        newAmount = currentAmount - selectedDrankAmount[n];
        console.log(`newAmount with cocktail`)
    } else if (selectedDrankIsMix == false) {
        newAmount = currentAmount - selectedDrankAmount;
        console.log(`newAmount one`)
    }

    leidingTegoed({name: hasToPay}).update({amount: newAmount})
    records.insert({date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),name: hasToPay, amount: selectedDrankAmount, drank: selectedDrank});
    
    // console.log(`updated tegoed: ${leidingTegoed().filter({column: hasToPay})}`)

    initiate();

    console.log(`amount selected: ${n}`)
}

function selectDrink(amount, n, mix) {
    selectedDrank = n;
    selectedDrankAmount = amount;
    selectedDrankMix = mix;

    if (mix == 0) {
        console.log(`selectDrink item not cocktail`)
        selectedDrankIsMix = false;
    } else {
        selectedDrankIsMix = true;
    }

    console.log(`price selected is ${selectedDrankAmount}`)

    document.querySelector("#selectContent").classList.remove('d-none');
    document.querySelector("#selectContent").scrollIntoView()
}

function showCurrentAmount(e) {
    document.querySelector('.showCurrentAmount').innerHTML = amount2Eur(e);
    document.querySelector("#showCurrentAmount").classList.remove('d-none');
}

function addDrank() {
    console.log(`add drank: ${inpDrankNaam.value} €${inpDrankAmount.value} ${inpDrankMix.value}`)
    if (inpDrankMix.value != '0') {
        console.log('cocktail toegevoegd')
        dranken.insert({name: inpDrankNaam.value, amount: [inpDrankAmount.value, inpDrankAmount2.value, inpDrankAmount3.value], mix: inpDrankMix.value, color: inpDrankColor.value});
    } else {
        console.log('fris/bier toegevoegd')
        dranken.insert({name: inpDrankNaam.value, amount: inpDrankAmount.value, mix: inpDrankMix.value, color: inpDrankColor.value});
    }
    generateDrank();
    generateListDranken()
    feather.replace();
}

function removeDrank(n) {
    console.log(`remove: ${n}`);
    dranken({name: n}).remove();
    generateDrank();
    feather.replace();
}

function generateDrank() {
    tempStr = ''
    dranken().order("name asec").each((r) => {
        let calcAMount = parseFloat(r.amount[0]) + parseFloat(r.amount[1]) + parseFloat(r.amount[2]);
        if (calcAMount >= 0) {
            d = `<strong>Enkel</strong> ${amount2Eur(r.amount[0])} <strong class="ml-3">Dubbel</strong> ${amount2Eur(r.amount[1])} <strong class="ml-3">Halve</strong> ${amount2Eur(r.amount[2])}`
        } else {
            d = `${amount2Eur(r.amount)}`;
        }
        
        tempStr += `
        <tr>
            <td>${r.name}</td>
            <td>${d}</td>
            <td>${inputMix2String(r.mix)}</td>
            <td><div class="drank-color-tag" style="background-color: ${r.color}"></div></td>
            <td><button class="btn btn-danger no-txt" onclick="removeDrank('${r.name}')"><i data-feather="trash-2"></i></button></td>
        </tr>
        `
    });

    document.querySelector('#tableDrank').innerHTML = tempStr;
}

function generateListDranken() {
    tempStr = ''
    dranken().order("name asec").each((r) => {
        let calcAMount = parseFloat(r.amount[0]) + parseFloat(r.amount[1]) + parseFloat(r.amount[2]);
        if (calcAMount >= 0) {
            d = `${r.amount[0]}, ${r.amount[1]}, ${r.amount[2]}`;
        } else {
            d = r.amount;
        }
        tempStr += `
        <button style="background-color: ${r.color} !important; border: none;" class="btn btn-primary txt-item flex-grid-item" onclick="selectDrink([${d}],'${r.name}', ${r.mix})"><span class="d-block">${r.name}</span><span class="d-block">${inputMix2String(r.mix)}</span></button>
        `
    });

    document.querySelector('#listDranken').innerHTML = tempStr
}

function topUp(p, e) {
    newAmount = e + parseFloat(inpTopUp.value);
    console.log('topup person ' + p);
    console.log('input value ' + inpTopUp.value);
    console.log('current amount ' + parseFloat(e));
    console.log('new amount ' + newAmount);
    // console.log('new amount ' + e);
    if (e != '') {
        leidingTegoed({name: p}).update({amount: newAmount});
        inpTopUp.value = '0'
    } else {
        alert('false amount')
    }

    initiate();
}

function generateRecords() {
    tempStr = ''
    records().order("date desc").each((r) => {
        tempStr += `
        <tr>
            <td>${r.date}</td>
            <td>${r.name}</td>
            <td>${r.drank}</td>
            <td>${amount2Eur(r.amount)}</td>
        </tr>
        `
    });

    document.querySelector('#tableRecords').innerHTML = tempStr;
}

function save() {
    let tempStr1 = '';
    records().each(function (r) {
    tempStr1 += `,
    {
        "date": "${r.date}",
        "name": "${r.name}",
        "drank": "${r.drank.replace('.',',')}",
        "amount": "${r.amount}"
    }`
    });
    const file1 = `
        [${tempStr1.slice(3)}]
    `;

    // console.log(tempStr1.slice(3))
    const blob1 = new Blob([file1], {type: 'application/javascript'});
    saveAs(blob1, `backup_records_${dd}${mm}${yyyy}_${hh}${nn}.js`)

    //////////////////////////////////////////////////////////////////

    let tempStr2 = '';
    leidingTegoed().each(function (r) {
    tempStr2 += `,
    {
        "name": "${r.name}",
        "amount": "${r.amount}"
    }`
    });
    const file2 = `
        [${tempStr2.slice(3)}]
    `;

    // console.log(tempStr2.slice(3))
    const blob2 = new Blob([file2], {type: 'application/javascript'});
    saveAs(blob2, `backup_leiding_${dd}${mm}${yyyy}_${hh}${nn}.js`)

    //////////////////////////////////////////////////////////////////

    let tempStr3 = '';
    dranken().each(function (r) {
    tempStr3 += `,
    {
        "name": "${r.name}",
        "amount": "${r.amount}"
        "mix": "${r.mix}"
        "color": "${r.color}"
    }`
    });
    const file3 = `
        [${tempStr3.slice(3)}]
    `;

    // console.log(tempStr3.slice(3))
    const blob3 = new Blob([file3], {type: 'application/javascript'});
    saveAs(blob3, `backup_drank_${dd}${mm}${yyyy}_${hh}${nn}.js`)
}

function logInAdmin() {
    if (a(inpAdminPassword.value) == adminPassw ) {
        console.log('admin logged in');
        body.setAttribute('data-admin-login', true)
        // localStorage.setItem('admin-logged-in', true);
    } else {
        console.log('password false');
        alert('Het opgegeven wachtwoord is fout')
    }

    generateDrank();
    feather.replace();
}

function logOffAdmin() {
    console.log('admin logged off');
    body.setAttribute('data-admin-login', false)
    // localStorage.setItem('admin-logged-in', false);
    // console.log(localStorage.removeItem('admin-logged-in'));
}

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('fileinput');
    let filename = input.value.split("\\").pop();

    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        let lines = e.target.result;
        var newArr = JSON.parse(lines);
        
        if (filename.includes('records')) {
            records().remove();
            newArr.forEach((r) => {
                console.log(r.date + ' ' + r.amount);
                records.insert({date: r.date,name: r.name, amount: r.amount, drank: r.drank});
            });
        } else if (filename.includes('leiding')) {
            leidingTegoed().remove();
            newArr.forEach((r) => {
                console.log(r.name + ' ' + r.amount);
                leidingTegoed.insert({name: r.name, amount: r.amount});
            });
        } else if (filename.includes('dranken')) {
            dranken().remove();
            newArr.forEach((r) => {
                console.log(r.name + ' ' + r.amount);
                leidingTegoed.insert({name: r.name, amount: r.amount});
                dranken.insert({name: r.name,  amount: r.amount, mix: r.mix, color: r.color});
            });
        }

        initiate();
    }
}

function removeDBRecords() {
    records().remove();
    initiate();
}

function removeDBLeiding() {
    leidingTegoed().remove();
    initiate();
}

function removeDBDranken() {
    dranken().remove();
    initiate();
}

function amount2Eur(n) {
    // console.log('amount2Eur ' + n)
    return `€ ${parseFloat(n.toString()).toFixed(2).toString().replace('.',',')}`
}

function inputMix2String(n) {
    let d = '';
    switch (n) {
        case '1':
            d = 'Fris';
            break;
        case '2':
            d = 'Fristi / fruitsap';
            break;
    }

    // console.log(`n: ${n}, d: ${d}`)

    return d
}

// Als laatste
initiate();