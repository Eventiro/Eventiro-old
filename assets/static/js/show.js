const showBtn = document.querySelector('.container__form--field__data--show');
const password = document.querySelector('#form__password');

showBtn.addEventListener('click',()=>{
    if(password.getAttribute('type') == "password"){
        password.setAttribute('type', 'text');
