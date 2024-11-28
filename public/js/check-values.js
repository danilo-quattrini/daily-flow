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
        emailError.innerHTML = '<img src="/public/img/svg/x-circle.svg" alt="Error" width="18" height="18"/> Email is not valid';
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