"use strict";
// Select relevant DOM elements
let form = document.querySelector('form');
let slider = document.querySelector('input[type="range"]');
let indicatorWrapper = document.querySelector('#password_gen_strength_ind_boxes_wrap');
let pStrength = document.getElementById('password_gen_strength');
let pWordTop = document.getElementById('password_gen_app_top_password');
let passwordLength = document.getElementById('password_gen_app_char_length_p');
let copyBtn = document.getElementById('password_gen_app_top_password_copy');
// Object to store password generation options
let passwordOptions = {
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_symbols: false,
};
// Updates the displayed password length and adjusts the slider background
function updatePWordLength() {
    if (slider && passwordLength) {
        passwordLength.textContent = slider.value;
        calcValue(); // Adjust slider styling
        updateStrength(); // Update password strength indicator
    }
}
// Copies the generated password to the clipboard
function copyPWord() {
    if (copyBtn && (pWordTop === null || pWordTop === void 0 ? void 0 : pWordTop.textContent)) {
        navigator.clipboard.writeText(pWordTop.textContent);
        copyBtn.classList.add('active');
        setTimeout(() => {
            copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.classList.remove('active');
        }, 2000);
    }
}
// Adjusts the slider's background color based on its value
function calcValue() {
    if (slider) {
        let valuePercentage = ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF ${valuePercentage}%, #18171F ${valuePercentage}%)`;
    }
}
// Handles checkbox selections to update password options
function handleClick(e) {
    let target = e.target;
    if (target.name in passwordOptions) {
        passwordOptions[target.name] = target.checked;
        updateStrength(); // Recalculate strength when options change
    }
}
// Generates a password based on selected options and updates the UI
function generatePassword(e) {
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
    // Generate the password by selecting random characters from the charset
    let password = Array.from({ length: +slider.value }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
    // Update the displayed password
    if (pWordTop) {
        pWordTop.textContent = password;
        pWordTop.classList.add('active');
    }
}
// Updates the password strength indicator based on selected options and length
function updateStrength() {
    let strength = 0;
    let length = parseInt((slider === null || slider === void 0 ? void 0 : slider.value) || '0');
    let strengthObject = {
        '0': '',
        '1': 'too_weak',
        '2': 'weak',
        '3': 'medium',
        '4': 'strong'
    };
    // Increase strength based on selected character sets
    if (passwordOptions.include_uppercase)
        strength++;
    if (passwordOptions.include_lowercase)
        strength++;
    if (passwordOptions.include_numbers)
        strength++;
    if (passwordOptions.include_symbols)
        strength++;
    // Additional strength boost based on password length
    if (length >= 8)
        strength++;
    if (length >= 12)
        strength++;
    // Cap strength at 4 (maximum defined in strengthObject)
    strength = Math.min(strength, 4);
    let stringStrength = strength.toString();
    // Update strength indicator styles
    indicatorWrapper === null || indicatorWrapper === void 0 ? void 0 : indicatorWrapper.classList.remove('too_weak', 'weak', 'medium', 'strong');
    if (indicatorWrapper && strengthObject[stringStrength]) {
        indicatorWrapper.classList.add(strengthObject[stringStrength]);
    }
    // Update strength text display
    if (pStrength && strengthObject[stringStrength]) {
        pStrength.textContent = strengthObject[stringStrength].replace('_', ' ');
        pStrength.classList.add('active');
    }
    else {
        pStrength === null || pStrength === void 0 ? void 0 : pStrength.classList.remove('active');
    }
}
// Event listeners for user interactions
form === null || form === void 0 ? void 0 : form.addEventListener('input', handleClick);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', generatePassword);
copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.addEventListener('click', copyPWord);
slider === null || slider === void 0 ? void 0 : slider.addEventListener('input', updatePWordLength);
