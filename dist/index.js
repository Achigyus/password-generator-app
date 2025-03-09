"use strict";
let form = document.querySelector('form');
let slider = document.querySelector('input[type="range"]');
let indicatorWrapper = document.querySelector('#password_gen_strength_ind_boxes_wrap');
let pStrength = document.getElementById('password_gen_strength');
let pWordTop = document.getElementById('password_gen_app_top_password');
let passwordLength = document.getElementById('password_gen_app_char_length_p');
let copyBtn = document.getElementById('password_gen_app_top_password_copy');
let passwordOptions = {
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_symbols: false,
};
function updatePWordLength() {
    if (slider && passwordLength) {
        passwordLength.textContent = ((slider === null || slider === void 0 ? void 0 : slider.value) || '0');
        calcValue();
    }
}
function copyPWord() {
    if (copyBtn && (pWordTop === null || pWordTop === void 0 ? void 0 : pWordTop.textContent)) {
        navigator.clipboard.writeText(pWordTop === null || pWordTop === void 0 ? void 0 : pWordTop.textContent);
        copyBtn.classList.add('active');
        setTimeout(() => {
            copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.classList.remove('active');
        }, 2000);
    }
}
function calcValue() {
    if (slider) {
        let valuePercentage = ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF ${valuePercentage}%, #18171F ${valuePercentage}%)`;
    }
}
function handleClick(e) {
    let target = e.target;
    if (target.name in passwordOptions) {
        let converted = Boolean(target.checked);
        passwordOptions[target.name] = target.checked;
        updateStrength();
    }
}
function checkStrength(e) {
    e.preventDefault();
    if (!slider)
        return;
    let charset = '';
    if (passwordOptions.include_uppercase)
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passwordOptions.include_lowercase)
        charset += 'abcdefghijklmnopqrstuvwxyz';
    if (passwordOptions.include_numbers)
        charset += '0123456789';
    if (passwordOptions.include_symbols)
        charset += '!@#$%^&*()_+<>[]{}';
    if (!charset)
        return console.log('No password generated');
    let password = Array.from({ length: +slider.value }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
    if (pWordTop) {
        pWordTop.textContent = password;
        pWordTop.classList.add('active');
    }
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
    let stringStrength = strength.toString();
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
