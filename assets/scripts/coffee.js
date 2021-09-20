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
async function loginNextClick() {

    var details = {
        'username': txtUserName.value,
        'password': txtPassword.value
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody)

    fetch('http://192.168.8.13:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'success') {
                console.log(data.token);
                localStorage.setItem("userToken", data.token);
                window.location.href = 'date.html';

            } else {
                alert('Could not log in')
            }
        });

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