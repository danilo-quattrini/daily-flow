document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Select the form
    const submitBtn = document.getElementById('submit-button'); // Select the submit button

    // Add event listener to check fields on input change
    form.addEventListener('input', function () {
        if (areAllFieldsValid()) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'true');
        }
    });

    // Function to check if all required fields are valid
    function areAllFieldsValid() {
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const passwordRequirements = document.querySelectorAll('.password-requirements-list li');

        // Check email and password fields are not empty
        if (email === '' || password === '' || name === '' || surname === '') {
            return false;
        }

        // Check email is valid using the email script develpoed in the check-values.js
        if (!checkEmail()) {
            return false;
        }

        // Check if all password requirements are valid
        for (const requirement of passwordRequirements) {
            if (requirement.classList.contains('invalid')) {
                return false;
            }
        }

        return true; // All fields are valid
    }
});