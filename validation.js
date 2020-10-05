
//Input fields
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const email = document.querySelector('#email');
const gender = document.querySelector('#gender');
const option = document.querySelector('#option');

//Form
const form = document.querySelector('#myform');

//Data view
const container = document.querySelector('.submitData');

//Validation colors;
const green ='#4CAF50';
const red = '#F44336';

// Handle form
form.addEventListener('submit', function(event) {
    // Prevent default behaviour
    event.preventDefault();
    if (
        validateFirstName() &&
        validationLastName() &&
        validationPassword() &&
        validationConfirmPassword() &&
        validationEmail() &&
        validationGender()
    ) {
        //clear content
        container.innerHTML = '';

        const gender = checkGender();

        const submitData = {
            firstName:firstName.value,
            lastName: lastName.value,
            password: password.value,
            email: email.value,
            option: option.value,
            gender: gender
        }

        const loader = document.createElement('div');
        loader.className = 'progress';
        const loadingBar = document.createElement('div');
        loadingBar.className = 'indeterminate';
        loader.appendChild(loadingBar);
        container.appendChild(loader);
        setTimeout(function() {
            const loaderDiv = document.querySelector('.progress');
            const panel = document.createElement('div');
            panel.className = 'card-panel';
            const text = document.createElement('p');
            text.className = 'blue-text text-darken-2';
            text.appendChild(document.createTextNode(`Sign up successful, welcom to Social-App`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`First Name: ${submitData.firstName}`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`Last Name: ${submitData.lastName}`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`Password: ${submitData.password}`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`Email: ${submitData.email}`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`Gender: ${submitData.gender}`));
            text.appendChild(document.createElement('br'));
            text.appendChild(document.createTextNode(`Option selected: ${submitData.option}`));
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
        }, 3000);
    }
});

// Validators
function validateFirstName() {
    // check if is empty
    if (checkIfEmpty(firstName)) return;
    //Must of in certain length
    if (!meetLength(firstName, 3, 20)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(firstName)) return;
    return true;
}

function validationLastName() {
    // check if is empty
    if (checkIfEmpty(lastName)) return;
    //Must of in certain length
    if (!meetLength(lastName, 3, 20)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(lastName)) return;
    return true;
}

function validationPassword() {
    // Empty check
    if (checkIfEmpty(password)) return;
    // Must of in certain length
    if (!meetLength(password, 4, 100)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
      if (!containsCharacters(password, 2)) return;
    return true;
}

function validationConfirmPassword() {
    if (password.className !== 'valid') {
        setInvalid(confirmPassword, 'Password must be valid');
        return;
    }
    // If they match
    if (password.value !== confirmPassword.value) {
        setInvalid(confirmPassword, 'Passwords must match');
        return;
    } else {
        setValid(confirmPassword);
    }
    return true;
}

function validationEmail(){
    if (checkIfEmpty(email)) return;
    if (!containsCharacters(email, 5)) return;
    return true;
}

function validationGender(){
    if (form.gender[0].checked == false && form.gender[1].checked==false){
        setInvalid(gender, `select gender`);
        return false;
    } else {
        setValid(gender);
        return true;
    }
}
//utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}

function isEmpty(value){
    if(value === ''){
        return true;
    } else {
        return false;
    }
}

function checkIfOnlyLetters(field){
    if(/^[a-zA-Z]+$/.test(field.value)){
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters, no space between letters`);
        return false;
    }
}

function setInvalid(field, errorMessage){
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = errorMessage;
    field.nextElementSibling.style.color = red;
}

function setValid(field){
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
}

function meetLength(field, minLength, maxLength){
    if (field.value.length >= minLength && field.value.length < maxLength){
        setValid(field);
        return true;
    } else if (field.value.length < minLength){
        setInvalid(field,`${field.name} must be more than ${minLength-1} characters`);
        return false;
    } else {
        setInvalid(filed,`${field.name} must be less than ${maxLength} characters`);
        return false;
    }
}

function containsCharacters(field, code){
    let regEx;
    switch (code){
        case 1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            // letter and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one letter and one number'
            );
        case 3:
            // uppercase, lowercase and number
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one uppercase, one lowercase letter and one number'
            );
        case 4:
            // uppercase, lowercase, number and special char
            regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one uppercase, one lowercase letter, one number and one special character'
            );
        case 5:
            // Email pattern
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must be a valid email address');
        default:
            return false;
    }
}

function matchWithRegEx(regEx, field, errorMessage) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, errorMessage);
        return false;
    }
}

function checkGender() {
    if (form.gender[0].checked == true) {
       return 'male';
    } else if(form.gender[1].checked == true){
        return 'female';
    }
}