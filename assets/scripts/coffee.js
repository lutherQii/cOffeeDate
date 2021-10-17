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
    var valid = true;
    if (txtUserName.value.length == 0) {
        valid = false;
        console.log('Username Required');
    }
    if (txtPassword.value.length == 0) {
        console.log('Password Required');
        valid = false;
    }
    if (!valid) {
        return;
    }

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
async function registerNextClick() {
    valid = true;
    if (txtRegisterUsername.value.length == 0) {
        valid = false;
        console.log('Username Required');
        //alert('test');
    }
    if (txtRegisterEmail.value.length == 0) {
        valid = false;
        console.log('Email Required');
    }
    else if (!ValidateEmail(txtRegisterEmail.value)) {
        valid = false;
        console.log('Invalid Email');
    }
    if (txtRegisterCell.value.length == 0) {
        valid = false;
        console.log('Cell No Required');
    }
    else if (!validateCellNo(txtRegisterCell.value)) {
        valid = false;
        console.log('Invalid Cell No');
    }
    if (txtRegisterPassword.value.length == 0) {
        valid = false;
        console.log('Password required');
    }
    else if (!ValidatePasswordStrength(txtRegisterPassword.value)) {
        valid = false;
        console.log('Password must be at least 8 characters,have one uppercase and lowercase letter, one digit and one special character.');
    }
    if (valid) {
        // alert('Username: ' + txtRegisterUsername.value + ' Email: ' + txtRegisterEmail.value
        //     + ' Cell: ' + txtRegisterCell.value + ' Password: ' + txtRegisterPassword.value);
        var details = {
            'username': txtRegisterUsername.value,
            'password': txtRegisterPassword.value,
            'cell': txtRegisterCell.value,
            'email': txtRegisterEmail.value
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody)

        fetch('http://192.168.8.13:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(response => response.json())
            .then(data => {

                console.log(data);
                if (data.status == 'success') {
                    console.log(data.token);
                    localStorage.setItem("userToken", data.token);

                    if (data.gotoOTP == 'true') {
                        registerStep1Div.style.display = "none";
                        registerOTPDiv.style.display = "block";

                        localStorage.setItem("userVARRegister", JSON.stringify(data.userVAR));
                        alert('Dummy OTP: ' + data.dummyOTP)
                    }

                } else {
                    alert('Could not regiter user')
                }
            });


        registerStep1Div.style.display = "none";
        registerOTPDiv.style.display = "block";
    }
    //alert('Username: ' + txtRegisterUsername.value + ' Email: ' + txtRegisterEmail.value
    //   + ' Cell: ' + txtRegisterCell.value + ' Password: ' + txtRegisterPassword.value);
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false);
}
function validateCellNo(number) {

    var trimmed = number.replace(/\s/g, '');

    var regex = /^0(6|7|8){1}[0-9]{1}[0-9]{7}$/;

    if (regex.test(trimmed) === true) {
        return (true);
    }
    return (false);
}
function ValidatePasswordStrength(PasswordParameter) {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    if (strongPassword.test(PasswordParameter)) {
        //strengthBadge.style.backgroundColor = "green";
        //strengthBadge.textContent = 'Strong';
        return true;
    } else if (mediumPassword.test(PasswordParameter)) {
        //strengthBadge.style.backgroundColor = 'blue';
        //strengthBadge.textContent = 'Medium';
        return true;
    } else {
        //strengthBadge.style.backgroundColor = 'red';
        //strengthBadge.textContent = 'Weak';
        return false;
    }
    return false;
}
function resendOTPClick() {
    alert('Resend OTP');
}
function otpNextClick() {
    if (txtOTP.value.length == 0) {
        console.log('OTP Required');
    }
    // else if (txtOTP.value.length != 4) {
    //     'Invalid OTP';
    // }
    // else {
    //     alert('OTP: ' + txtOTP.value);
    // }
    var t = JSON.parse(localStorage.getItem("userVARRegister"));

    var details = {
        'username': t.username,
        'password': t.password,
        'email': t.email,
        'OTP': txtOTP.value
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody)

    fetch('http://192.168.8.13:3000/user/checkOTP', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
        .then(response => response.json())
        .then(data => {

            if (data.length > 0) {
                var details = {
                    'username': t.username,
                    'password': t.password
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

                        console.log(data);

                        if (data.status == 'success') {
                            console.log(data.token);
                            localStorage.setItem("userToken", data.token);
                            window.location.href = 'date.html';

                        } else {
                            alert('Could not log in')
                        }
                    });
            } else {
                document.getElementById('spnOTPErrorText').innerHTML = 'OTP Not valid';
            }

        });
}


function refisterFBClick() {
    alert('Register FB');
}
function refisterAppleClick() {
    alert('Register Apple');
}