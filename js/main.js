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
    errorNewLeiding = document.querySelector('#errorNewLeiding');

let leiding = [],
    hasToPay = '',
    personIndex,
    leidingCurrentAmount,
    newAmount,
    content = 2,
    leidingTegoed = TAFFY().store('leiding-tegoed'),
    records = TAFFY().store('records');

    console.log('records' + records().stringify());
    console.log('leidingTegoed' + leidingTegoed().stringify());

btnSave.addEventListener('click', () => {
    if (inpSaveLeidingNaam.value == '' || inpSaveLeidingBedrag.value == '' ) {
        console.log('lol')
        errorNewLeiding.classList.remove('d-none');
    } else {
        errorNewLeiding.classList.remove('d-none');
        errorNewLeiding.classList.remove('d-none');
        leidingTegoed.insert({name: inpSaveLeidingNaam.value, amount: inpSaveLeidingBedrag.value});
        generateUI();
    }
    // leiding.push([inpSaveLeidingNaam.value + '+' + inpSaveLeidingBedrag.value]);
    // localStorage.setItem('leiding', leiding);
    // console.log(localStorage.getItem('leiding'));
});

function generateUI() {
    let tempStr = '', tableTempStr = '';

    leidingTegoed().each(function (el) {
        leidingCurrentAmount = el.amount;
        tempStr += `
            <button class="btn btn-primary" onclick="selectPerson('${el.name}', '${el.amount}')">${el.name}</button>
        `;
    
        tableTempStr += `
        <tr>
            <td>${el.name}</td>
            <td>€${el.amount}</td>
            <td>
                <button class="btn btn-info" onclick="topUp()">Topup</button>
                <button class="btn btn-danger" onclick="removePerson('${el.name}')">x</button>
            </td>
        </tr>
        `;
    });

    buttons.innerHTML = tempStr;
    tableLeiding.innerHTML = tableTempStr;
    // console.log(buttons);
}

generateUI();

function selectPerson(n, e) {
    hasToPay = n;
    currentAmount = e;
    console.log(`has to pay: ${hasToPay}`);
    console.log(bordContent);

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
    document.querySelector('.showCurrentAmount').innerHTML = e;
    document.querySelector("#showCurrentAmount").classList.remove('d-none');
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
    records().each(function (r) {
        tempStr += `
        <tr>
            <td>${r.date}</td>
            <td>${r.name}</td>
            <td>${r.drank.replace('.',',')}</td>
            <td>€${r.amount}</td>
        </tr>
        `
    });

    document.querySelector('#tableRecords').innerHTML = tempStr;
}

generateRecords();