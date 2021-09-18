const mainOptionDiv = document.getElementById('mainOptionsDIV');
const loginDiv = document.getElementById('loginDIV');
const registerStep1Div = document.getElementById('registerStep1Div');
const registerOTPDiv = document.getElementById('registerOTPDiv');
const txtUserName = document.getElementById('TxtUsername');
const txtPassword = document.getElementById('TxtPassword');
const txtRegisterUsername = document.getElementById('TxtRegisterUserName');
const txtRegisterEmail = document.getElementById('TxtRegisterEmail');
const txtRegisterCell = document.getElementById('TxtRegisterCell');
const txtRegisterPassword = document.getElementById('TxtRegisterPassword');
const txtOTP = document.getElementById('TxtOTP');

function loginClick() {
    mainOptionDiv.style.display = "none";
    loginDiv.style.display = "block";
}

function registerClick() {
    mainOptionDiv.style.display = "none";
    registerStep1Div.style.display = "block";
}
function loginNextClick() {
    alert('Username: ' + txtUserName.value + ' Pasword: ' + txtPassword.value);
}
function registerNextClick() {
    alert('Username: ' + txtRegisterUsername.value + ' Email: ' + txtRegisterEmail.value
        + ' Cell: ' + txtRegisterCell.value + ' Password: ' + txtRegisterPassword.value);
        registerStep1Div.style.display = "none";
        registerOTPDiv.style.display = "block";
}
function resendOTPClick() {
    alert('Resend OTP');
}
function otpNextClick() {
    alert('OTP: ' + txtOTP.value);
}
function refisterFBClick() {
    alert('Register FB');
}
function refisterAppleClick() {
    alert('Register Apple');
}