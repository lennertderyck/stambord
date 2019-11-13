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
    inpDrankAmount = document.querySelector("#inpDrankAmount");

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
    leidingCurrentAmount,
    newAmount,
    content = 2,
    leidingTegoed = TAFFY().store('leiding-tegoed'),
    records = TAFFY().store('records'),
    dranken = TAFFY().store('dranken');

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
            <button class="btn btn-primary txt-item" onclick="selectPerson('${el.name}', '${el.amount}')">${el.name}</button>
        `;
    
        tableTempStr += `
        <tr>
            <td>${el.name}</td>
            <td>${amount2Eur(el.amount)}</td>
            <td>
                <button class="btn btn-info mr-2" onclick="topUp()"><i data-feather="dollar-sign"></i>Topup</button>
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

    document.querySelector("#selectContent").classList.remove('d-none');

    showCurrentAmount(currentAmount);
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

    document.querySelector("#selectDrank").classList.remove('d-none');
    console.log(`amount selected: ${n}`)
}

function payDrink(amount, n) {
    newAmount = currentAmount - amount*content;

    document.querySelector("#selectContent").classList.add('d-none');
    document.querySelector("#selectDrank").classList.add('d-none');
    document.querySelector("#showCurrentAmount").classList.add('d-none');
    document.querySelector("#notifCurrentAmount").classList.add('d-none');

    leidingTegoed({name: hasToPay}).update({amount: newAmount})
    records.insert({date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),name: hasToPay, amount:amount*content, drank: n});
    
    console.log(`updated tegoed: ${leidingTegoed().filter({column: hasToPay})}`)
    generateUI();
    generateRecords();
}

function showCurrentAmount(e) {
    document.querySelector('.showCurrentAmount').innerHTML = amount2Eur(e);
    document.querySelector("#showCurrentAmount").classList.remove('d-none');
}

function addDrank() {
    console.log(`add drank: ${inpDrankNaam.value} ${inpDrankAmount.value} €${inpDrankMix.value}`)
    dranken.insert({name: inpDrankNaam.value, amount: inpDrankAmount.value, mix: inpDrankMix.value});
    generateDrank();
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
        tempStr += `
        <tr>
            <td>${r.name}</td>
            <td>${amount2Eur(r.amount)}</td>
            <td>${r.mix}</td>
            <td><button class="btn btn-danger no-txt" onclick="removeDrank('${r.name}')"><i data-feather="trash-2"></i></button></td>
        </tr>
        `
    });

    document.querySelector('#tableDrank').innerHTML = tempStr;
}

function generateListDranken() {
    tempStr = ''
    dranken().order("name asec").each((r) => {
        tempStr += `
        <button class="btn btn-primary txt-item" onclick="payDrink(${r.amount},'${r.name} ${r.mix}')"><span class="d-block">${r.name}</span><span class="d-block">${r.mix}</span></button>
        `
    });

    document.querySelector('#listDranken').innerHTML = tempStr
}

function topUp(n) {
    personIndex = n;
    leiding[personIndex];
    inpTopUp.value;

    console.log(`selected top up: ${leiding[personIndex]}`);

    generateUI();
}

function generateRecords() {
    tempStr = ''
    records().order("date desc").each((r) => {
        tempStr += `
        <tr>
            <td>${r.date}</td>
            <td>${r.name}</td>
            <td>${r.drank.replace('.',',')}</td>
            <td>${amount2Eur(r.amount)}</td>
        </tr>
        `
    });

    document.querySelector('#tableRecords').innerHTML = tempStr;
}

initiate();

function save() {
    let tempStr1 = '';
    records().each(function (r) {
        tempStr1 += `
        <tr>
            <td>${r.date}</td>
            <td>${r.name}</td>
            <td>${r.drank.replace('.',',')}</td>
            <td>${amount2Eur(r.amount)}</td>
        </tr>
        `
    });
    const file1 = `
        <table>
        <tr>
            <th>Datum</th>
            <th>Naam</th>
            <th>Drank</th>
            <th>Bedrag</th>
        </tr>
        ${tempStr1}
        </table>
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    `;

    let tempStr2 = '';
    leidingTegoed().each(function (r) {
        tempStr2 += `
        <tr>
            <td>${r.name}</td>
            <td>${amount2Eur(r.amount)}</td>
        </tr>
        `
    });
    const file2 = `
        <table>
        <tr>
            <th>Naam</th>
            <th>Tegoed</th>
        </tr>
        ${tempStr2}
        </table>
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    `;

    const blob1 = new Blob([file1], {type: "text/html;charset=utf-8"});
    saveAs(blob1, `extract_records_${dd}${mm}${yyyy}_${hh}${nn}.html`)

    const blob2 = new Blob([file2], {type: "text/html;charset=utf-8"});
    saveAs(blob2, `extract_leidingtegoed_${dd}${mm}${yyyy}_${hh}${nn}.html`)
}

function amount2Eur(n) {
    return `€ ${parseFloat(n.toString()).toFixed(2).toString().replace('.',',')}`
}
 
