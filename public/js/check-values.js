/*function that check the email field*/
function checkEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');
    const emailInput = document.getElementById('email');

    // Use a simple regex to validate email format (alternative to validator.js)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (email === '') {
        emailError.innerHTML = '';
        emailInput.classList.remove('is-invalid');
        return true;
    } else if (isValidEmail) {
        emailError.innerHTML = '';
        emailInput.classList.remove('is-invalid');
        return true;
    } else {
        emailError.innerHTML = '<img src="/img/svg/x-circle.svg" alt="Error" width="18" height="18"/> Email is not valid';
        emailInput.classList.add('is-invalid');
        return false;
    }
}

/*function to show the password of the input field*/
function showPassword() {
    const password = document.getElementById('password');
    const passwordIcon = document.getElementById('eyeOpen');

    if (password.type === 'password') {
        password.type = 'text';
        passwordIcon.src = '/public/img/svg/eye-slash.svg';
    } else {
        password.type = 'password';
        passwordIcon.src = '/public/img/svg/eye.svg';
    }
}

/*function that check the strength of the password field*/
function checkStrongPassword() {
    /*Taking the password value*/
    const password = document.getElementById('password').value;

    /*This one is the progress bar that shows the strength of the password*/
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthContainer = document.getElementById('password-strength-container');

    // Select all requirement list elements
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const lowercaseCheck = document.getElementById('lowercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCharCheck = document.getElementById('special-char-check');
    //Select all the list for the requirements
    const requirementsList = document.getElementById('password-requirements-list');
    // Select the strength text element
    let strength = 0;

    // Display the strength bar when the user starts typing
    strengthContainer.style.display = password.length > 0 ? 'block' : 'none';

    //Display the requirements list when the user starts typing
    requirementsList.style.display = password.length > 0 ? 'block' : 'none';

    // Check for length >= 8
    if (password.length >= 8){
        strength += 20;
        lengthCheck.classList.add('valid');
        lengthCheck.classList.remove('invalid');
    }else{
        strength -= 20;
        lengthCheck.classList.add('invalid');
        lengthCheck.classList.remove('valid');
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)){
        strength += 20;
        uppercaseCheck.classList.add('valid');
        uppercaseCheck.classList.remove('invalid');
    }else {
        strength -= 20;
        uppercaseCheck.classList.add('invalid');
        uppercaseCheck.classList.remove('valid');
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)){
        strength += 20;
        lowercaseCheck.classList.add('valid');
        lowercaseCheck.classList.remove('invalid');
    }else {
        strength -= 20;
        lowercaseCheck.classList.add('invalid');
        lowercaseCheck.classList.remove('valid');
    }

    // Check for numbers
    if (/\d/.test(password)){
        strength += 20;
        numberCheck.classList.add('valid');
        numberCheck.classList.remove('invalid');
    } else{
        strength -= 20;
        numberCheck.classList.add('invalid');
        numberCheck.classList.remove('valid');
    }

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)){
        strength += 20;
        specialCharCheck.classList.add('valid');
        specialCharCheck.classList.remove('invalid');
    }else {
        strength -= 20;
        specialCharCheck.classList.add('invalid');
        specialCharCheck.classList.remove('valid');
    }

    // Update the progress bar width
    strengthBar.style.width = `${strength}%`;

    // Update strength text and color based on strength level
    if (strength <= 40) {
        strengthBar.classList.remove('bg-warning', 'bg-success');
        strengthBar.classList.add('bg-danger');
    } else if (strength <= 80) {
        strengthBar.classList.remove('bg-danger', 'bg-success');
        strengthBar.classList.add('bg-warning');
    } else {
        strengthBar.classList.remove('bg-danger', 'bg-warning');
        strengthBar.classList.add('bg-success');
    }
}