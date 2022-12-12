exhchange()
const firstInput = document.querySelector('.first-input');
const secondInput = document.querySelector('.second-input');
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const parentDiv = e.target.parentElement;
        const selected = parentDiv.querySelector('.active');
        selected.classList.remove('active');
        e.target.classList.add('active');
        exhchange()
        calculate1()
    })
})
firstInput.addEventListener('keyup', calculate1)
secondInput.addEventListener('keyup', calculate2)
function calculate1() {
    let base = document.querySelector('.box1 .active');
    let symbols = document.querySelector('.box2 .active');
    fetch(`https://api.exchangerate.host/latest?base=${base.innerText}&symbols=${symbols.innerText}`)
        .then(res => res.json())
        .then(data => {
            let value = data.rates[`${symbols.innerText}`]
            if (firstInput.value != '') {
                secondInput.value = (firstInput.value * value).toFixed(2)
            } else {
                secondInput.value = ''
            }
        })
}
function calculate2() {
    let base = document.querySelector('.box1 .active');
    let symbols = document.querySelector('.box2 .active');
    fetch(`https://api.exchangerate.host/latest?base=${symbols.innerText}&symbols=${base.innerText}`)
        .then(res => res.json())
        .then(data => {
            let value = data.rates[`${base.innerText}`]
            if (secondInput.value != '') {
                firstInput.value = (secondInput.value * value).toFixed(2)
            } else {
                firstInput.value = ''
            }
        })
}
function exhchange() {
    let firstCurrency = document.querySelector('.box1 .active');
    let secondCurrency = document.querySelector('.box2 .active');
    let base = document.querySelector('.box1 .input p');
    let symbols = document.querySelector('.box2 .input p');
    fetch(`https://api.exchangerate.host/latest?base=${firstCurrency.innerText}&symbols=${secondCurrency.innerText}`)
        .then(res => res.json())
        .then(data => {
            let value = data.rates[`${secondCurrency.innerText}`];
            if (firstCurrency.innerText == secondCurrency.innerHTML) {
                base.innerText = `1 ${firstCurrency.innerText} = ${value} ${secondCurrency.innerText}`;
                symbols.innerText = base.innerText;
            } else {
                base.innerText = `1 ${firstCurrency.innerText} = ${value} ${secondCurrency.innerText}`;
                symbols.innerText = `1 ${secondCurrency.innerText} = ${(1 / value).toFixed(6)} ${firstCurrency.innerText}`
            }
        })
}