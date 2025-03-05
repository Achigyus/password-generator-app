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
    if (target.name === 'include_uppercase') {
        console.log(passwordOptions['include_uppercase']);
        let converted = Boolean(target.checked);
        console.log('type of is', typeof (converted));
        passwordOptions['include_uppercase'] = converted;
    }
    else {
        console.log('no match');
    }
    console.log(passwordOptions);
}
form === null || form === void 0 ? void 0 : form.addEventListener('input', handleClick);
