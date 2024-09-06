document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button[onclick="generatePassword()"]').addEventListener('click', generatePassword);
});

function generatePassword() {
    const characters = getSelectedCharacters();
    
    if (!characters) {
        document.getElementById('password').value = '';
        document.getElementById('strength').style.display = 'none';
        return;
    }

    const passwordLength = getPasswordLength();
    if (passwordLength === null) return;

    const password = createPassword(passwordLength, characters);
    document.getElementById('password').value = password;
    displayStrength(password);
}

function getSelectedCharacters() {
    let characters = '';
    if (document.getElementById('include-lowercase').checked) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (document.getElementById('include-uppercase').checked) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (document.getElementById('include-numbers').checked) {
        characters += '0123456789';
    }
    if (document.getElementById('include-symbols').checked) {
        characters += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    }
    return characters || null;
}

function getPasswordLength() {
    const length = parseInt(document.getElementById('length').value);
    if (length < 6 || length > 15) {
        alert('Şifre uzunluğu 6 ile 15 karakter arasında olmalıdır.');
        return null;
    }
    return length;
}

function createPassword(length, characters) {
    const selectedOptions = [];
    if (document.getElementById('include-lowercase').checked) selectedOptions.push('abcdefghijklmnopqrstuvwxyz');
    if (document.getElementById('include-uppercase').checked) selectedOptions.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (document.getElementById('include-numbers').checked) selectedOptions.push('0123456789');
    if (document.getElementById('include-symbols').checked) selectedOptions.push('!@#$%^&*()_+~`|}{[]\:;?><,./-=');

    let password = '';
    let optionsUsed = [];

    for (let i = 0; i < length; i++) {
        const category = selectedOptions[Math.floor(Math.random() * selectedOptions.length)];
        password += category[Math.floor(Math.random() * category.length)];
        if (!optionsUsed.includes(category)) {
            optionsUsed.push(category);
        }
    }

    if (optionsUsed.length < selectedOptions.length) {
        return createPassword(length, characters);
    }

    return password;
}

function displayStrength(password) {
    const strengthElement = document.getElementById('strength');
    strengthElement.style.display = 'block';
    strengthElement.innerText = "Şifre Gücü: " + evaluateStrength(password);
}

function evaluateStrength(password) {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/;
    const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    if (strongPattern.test(password)) return "Güçlü";
    if (mediumPattern.test(password)) return "Orta";
    if (password.length >= 6) return "Zayıf";
    return "Belirsiz";
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Şifre panoya kopyalandı!');
}
