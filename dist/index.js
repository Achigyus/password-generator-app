"use strict";
let form = document.querySelector('form');
let slider = document.querySelector('input[type="range"]');
let passwordOptions;
passwordOptions = {
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_symbols: false,
};
console.log(form, slider === null || slider === void 0 ? void 0 : slider.value);
slider === null || slider === void 0 ? void 0 : slider.addEventListener('input', () => {
    console.log(slider === null || slider === void 0 ? void 0 : slider.value);
});
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
        charset += '!@#$%^&*()_+';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    console.log('Generated password:', password);
    return password;
}
function updateStrength() {
    let strength = 0;
    if (passwordOptions.include_uppercase)
        strength++;
    if (passwordOptions.include_lowercase)
        strength++;
    if (passwordOptions.include_numbers)
        strength++;
    if (passwordOptions.include_symbols)
        strength++;
    console.log('Updated strength:', strength);
}
form === null || form === void 0 ? void 0 : form.addEventListener('input', handleClick);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', checkStrength);
