// pass_strength.js
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const passwordSuggestions = document.getElementById('passwordSuggestions');
const confirmPasswordValidityMessage = document.getElementById('confirmPasswordValidityMessage');
const strengthBar = document.querySelector('.strength-bar');
const strengthIndicator = document.getElementById('strengthIndicator');
const strengthText = document.getElementById('strengthText');
const togglePassword = document.getElementById('togglePassword');
const togglePasswordContainer = document.getElementById('togglePasswordContainer');
const minLength = 12; // Set your minimum password length


passwordInput.addEventListener('input', updateStrength);
passwordInput.addEventListener('input', updatePasswordSuggestions);
confirmPasswordInput.addEventListener('input', confirmPasswords);
togglePassword.addEventListener('change', togglePasswordVisibility);
togglePasswordContainer.addEventListener('click', togglePasswordVisibility);

function updateStrength() {
    const password = passwordInput.value;
    let strength = 0;

    // Check minimum password length
    if (password.length < minLength) {
        strength = 0; // Very Weak
        strengthText.textContent = 'Password is too short';
        
    } else {
        if (password.length >= minLength) {
            strength++;
        }

        if (password.match(/[0-9]/)) {
            strength++;
        }

        if (password.match(/[A-Z]/) && password.match(/[a-z]/)) {
            strength++;
        }

        if (password.match(/[!@#$%^&*()_+]/)) {
            strength++;
        }
    }

    const strengthColors = ['red', 'orange', 'yellow', 'green', 'blue'];
    const color = strengthColors[strength];

    strengthIndicator.style.backgroundColor = color;
    strengthBar.style.width = `${(strength / 4) * 100}%`;

    switch (strength) {
        case 0:
            strengthText.textContent = 'Very Weak';
            break;
        case 1:
            strengthText.textContent = 'Weak';
            break;
        case 2:
            strengthText.textContent = 'Medium';
            break;
        case 3:
            strengthText.textContent = 'Strong';
            break;
        case 4:
            strengthText.textContent = 'Very Strong';
            break;
    }
}


function confirmPasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === confirmPassword) {
        confirmPasswordInput.setCustomValidity('');
        confirmPasswordValidityMessage.textContent = ''; 
    } else {
        confirmPasswordInput.setCustomValidity('Passwords do not match');
        confirmPasswordValidityMessage.textContent = 'Passwords do not match';
    }
}


function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');

    passwordInput.type = togglePassword.checked ? 'text' : 'password';
    confirmPasswordInput.type = togglePassword.checked ? 'text' : 'password';
}


// Password suggestions

function updatePasswordSuggestions() {
    const password = passwordInput.value;
    const suggestions = [];

    if (password.length < 8) {
        suggestions.push('Minimum length of 12 characters');
    }

    if (!password.match(/[A-Z]/)) {
        suggestions.push('Include at least one uppercase letter');
    }

    if (!password.match(/[0-9]/)) {
        suggestions.push('Include at least one number');
    }

    if (!password.match(/[!@#$%^&*()_+]/)) {
        suggestions.push('Include special characters for added security');
    }

    passwordSuggestions.innerHTML = suggestions.map(suggestion => `<div>${suggestion}</div>`).join('');
}