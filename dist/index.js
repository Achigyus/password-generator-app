"use strict";
let form = document.querySelector('form');
let slider = document.querySelector('input[type="range"]');
let indicatorWrapper = document.querySelector('#password_gen_strength_ind_boxes_wrap');
let pStrength = document.getElementById('password_gen_strength');
let pWordTop = document.getElementById('password_gen_app_top_password');
let passwordLength = document.getElementById('password_gen_app_char_length_p');
let copyBtn = document.getElementById('password_gen_app_top_password_copy');
let passwordOptions;
passwordOptions = {
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_symbols: false,
};
function updatePWordLength() {
    console.log(slider === null || slider === void 0 ? void 0 : slider.value);
    if (passwordLength) {
        passwordLength.textContent = ((slider === null || slider === void 0 ? void 0 : slider.value) || '0');
        calcValue();
    }
    else {
        console.log(passwordLength);
    }
}
function copyPWord() {
    if (copyBtn) {
        let text = (pWordTop === null || pWordTop === void 0 ? void 0 : pWordTop.textContent) || '';
        navigator.clipboard.writeText(text);
        copyBtn.classList.add('active');
        setTimeout(() => {
            copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.classList.remove('active');
        }, 2000);
    }
}
function calcValue() {
    if (slider) {
        let valuePercentage = ((parseInt(slider.value) - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF ${valuePercentage}%, #18171F ${valuePercentage}%)`;
    }
}
function handleClick(e) {
    console.log('clicked');
    let target = e.target;
    console.log(e);
    console.log(target.name);
    console.log(target.checked);
    if (target.name === 'include_uppercase' || target.name === 'include_lowercase' || target.name === 'include_numbers' || target.name === 'include_symbols') {
        let converted = Boolean(target.checked);
        passwordOptions[`${target.name}`] = target.checked;
        updateStrength();
    }
    else {
        console.log('no match');
    }
    console.log(passwordOptions);
}
function checkStrength(e) {
    e.preventDefault();
    let password = '';
    let length = parseInt((slider === null || slider === void 0 ? void 0 : slider.value) || '0');
    let charset = '';
    if (passwordOptions.include_uppercase)
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passwordOptions.include_lowercase)
        charset += 'abcdefghijklmnopqrstuvwxyz';
    if (passwordOptions.include_numbers)
        charset += '0123456789';
    if (passwordOptions.include_symbols)
        charset += '!@#$%^&*()_+<>[]{}';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    if (!password) {
        console.log('No password generated');
        return;
    }
    if (pWordTop) {
        pWordTop.textContent = password;
        pWordTop.classList.add('active');
    }
    console.log('Generated password:', password);
    return password;
}
function updateStrength() {
    let strength = 0;
    let strengthObject = {
        '0': '',
        '1': 'too_weak',
        '2': 'weak',
        '3': 'medium',
        '4': 'strong'
    };
    if (passwordOptions.include_uppercase)
        strength++;
    if (passwordOptions.include_lowercase)
        strength++;
    if (passwordOptions.include_numbers)
        strength++;
    if (passwordOptions.include_symbols)
        strength++;
    console.log('Updated strength:', strength);
    let stringStrength = strength.toString();
    console.log('Updated strength:', strengthObject[`${stringStrength}`]);
    indicatorWrapper === null || indicatorWrapper === void 0 ? void 0 : indicatorWrapper.classList.remove('too_weak', 'weak', 'medium', 'strong');
    if (indicatorWrapper && strengthObject[stringStrength]) {
        indicatorWrapper.classList.add(strengthObject[stringStrength]);
    }
    if (pStrength) {
        pStrength.textContent = strengthObject[stringStrength].replace('_', ' ');
    }
}
form === null || form === void 0 ? void 0 : form.addEventListener('input', handleClick);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', checkStrength);
copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.addEventListener('click', copyPWord);
slider === null || slider === void 0 ? void 0 : slider.addEventListener('input', updatePWordLength);
