let form: HTMLFormElement | null = document.querySelector('form');
let slider: HTMLInputElement | null = document.querySelector('input[type="range"]');
let indicatorWrapper: HTMLElement | null = document.querySelector('#password_gen_strength_ind_boxes_wrap');
let pStrength: HTMLElement | null = document.getElementById('password_gen_strength')
let pWordTop: HTMLElement | null = document.getElementById('password_gen_app_top_password')
let passwordLength: HTMLElement | null = document.getElementById('password_gen_app_char_length_p')
let copyBtn: HTMLElement | null = document.getElementById('password_gen_app_top_password_copy')
let passwordOptions: Record<string, boolean> = {
    include_uppercase: false,
    include_lowercase: false,
    include_numbers: false,
    include_symbols: false,
};


function updatePWordLength() {
    if (slider && passwordLength) {
        passwordLength.textContent = (slider?.value || '0');
        calcValue()
    }
}

function copyPWord() {
    if (copyBtn && pWordTop?.textContent) {
        navigator.clipboard.writeText(pWordTop?.textContent)
        copyBtn.classList.add('active')
        setTimeout(() => {
            copyBtn?.classList.remove('active')
        }, 2000);
    }
}

function calcValue() {
    if (slider) {
        let valuePercentage = ((+slider.value - +slider.min) / (+slider.max - +slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF ${valuePercentage}%, #18171F ${valuePercentage}%)`
    } 
}

function handleClick(e: Event) {
    let target = e.target as HTMLInputElement;

    if (target.name in passwordOptions) {
        let converted = Boolean(target.checked);
        passwordOptions[target.name] = target.checked;
        updateStrength();
    }
}

function checkStrength(e: Event) {
    e.preventDefault();
    if (!slider) return;
    let charset = '';
    
    if (passwordOptions.include_uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passwordOptions.include_lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (passwordOptions.include_numbers) charset += '0123456789';
    if (passwordOptions.include_symbols) charset += '!@#$%^&*()_+<>[]{}';

    if (!charset) return console.log('No password generated');

    let password = Array.from({ length: +slider.value }, () => 
        charset.charAt(Math.floor(Math.random() * charset.length))
    ).join('');

    if (pWordTop) {
        pWordTop.textContent = password;
        pWordTop.classList.add('active')
    }
}

function updateStrength() {
    let strength = 0;
    let strengthObject: Record<string, string> = {
        '0': '',
        '1': 'too_weak',
        '2': 'weak',
        '3': 'medium',
        '4': 'strong'
    };
    
    if (passwordOptions.include_uppercase) strength++;
    if (passwordOptions.include_lowercase) strength++;
    if (passwordOptions.include_numbers) strength++;
    if (passwordOptions.include_symbols) strength++;


    let stringStrength = strength.toString();
    indicatorWrapper?.classList.remove('too_weak', 'weak', 'medium', 'strong');
    if (indicatorWrapper && strengthObject[stringStrength]) {
        indicatorWrapper.classList.add(strengthObject[stringStrength]);
    }
    if (pStrength) {
        pStrength.textContent = strengthObject[stringStrength].replace('_', ' ');
    }
    
}

form?.addEventListener('input', handleClick);
form?.addEventListener('submit', checkStrength);
copyBtn?.addEventListener('click', copyPWord)
slider?.addEventListener('input', updatePWordLength)