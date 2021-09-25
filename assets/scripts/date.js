const WIN_SWIPING = document.getElementById('Swiping');
const WIN_MATCHING = document.getElementById('Matching');
const WIN_PROFILE = document.getElementById('Profile');

const WIN_BASIC = document.getElementById('BasicInfo');
const WIN_MORE = document.getElementById('MoreInfo');

const LESSMORE = document.getElementById('SpnMoreLessInfo');

const IC_COFFEE = document.getElementById('CoffeeIcon');
const IC_HEART = document.getElementById('HeartIcon');
const IC_USER = document.getElementById('UserIcon');

const SLIDER = document.getElementById('slider-Div');

const ICO_LEFT = document.getElementById('IcoLeft');
const ICO_RIGHT = document.getElementById('IcoRight');

const SLIDER_range = document.getElementById("myRange");

const POPUP_MATCH_DIV = document.getElementById('PopupMatch');

const GB_USERINFO = {
    'fullname': document.getElementById('TxtFullName'),
    'location': document.getElementById('TxtLocation'),
    'age': document.getElementById('TxtAge'),
    'jobTitle': document.getElementById('TxtJobTitle'),
    'interests': document.getElementById('TxtInterests'),

    'intentions': document.getElementById('TxtIntentions'),
    'orientation': document.getElementById('TxtOrientation'),
    'biography': document.getElementById('TxtBiography'),
    'address': document.getElementById('TxtAddress'),

}

const token = localStorage.getItem('userToken');
if (token == null)
    window.location.href = 'coffee.html';
fetch('http://192.168.8.13:3000/user/data', {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})
    .then(res => res.json())
    .then(json => {
        // global_USERINFO = json;
     console.log(json);
        var userLGDIn = json.userInfo[0];
        localStorage.setItem('UserInfoLI', JSON.stringify(userLGDIn));
        console.log(userLGDIn);


        GB_USERINFO.fullname.value = userLGDIn.Name!=null?userLGDIn.Name:''+' ' +userLGDIn.Surname!=null?userLGDIn.Surname:'';
        GB_USERINFO.location.placeholder = 'Not Provided';

        GB_USERINFO.age.value = 23;
        GB_USERINFO.jobTitle.value = 'Programmer';

        GB_USERINFO.intentions.value = userLGDIn.Intentions!=null?userLGDIn.Intentions:'';
        GB_USERINFO.biography.value = userLGDIn.Biography!=null?userLGDIn.Biography:''


    })
    // .catch(err=> {

    //     localStorage.removeItem('userVARRegister'); 
    //     localStorage.removeItem('userToken'); 
    //     window.location.href = 'coffee.html';
    // });



WIN_SWIPING.style.display = WIN_MATCHING.style.display = WIN_MORE.style.display = SLIDER.style.display = POPUP_MATCH_DIV.style.display = "none";

function changeMenu(menuName) {
    WIN_SWIPING.style.display = WIN_MATCHING.style.display = WIN_PROFILE.style.display = SLIDER.style.display = "none";

    ICO_LEFT.classList.remove("fa-times", "fa-arrow-left");
    ICO_RIGHT.classList.remove("fa-check", "fa-arrow-right")

    IC_COFFEE.classList.add('bicRed');
    IC_HEART.classList.add('bicRed');
    IC_USER.classList.add('bicRed');

    IC_COFFEE.classList.remove('bicWhite');
    IC_HEART.classList.remove('bicWhite');
    IC_USER.classList.remove('bicWhite');

    if (menuName == 'Swiping' || menuName == 1) {
        WIN_SWIPING.style.display = SLIDER.style.display = "block";

        ICO_LEFT.classList.add("fa-times");
        ICO_RIGHT.classList.add("fa-check");

        IC_COFFEE.classList.remove('bicRed');
        IC_COFFEE.classList.add('bicWhite');
    }
    if (menuName == 'Matching' || menuName == 2) {
        WIN_MATCHING.style.display = SLIDER.style.display = "block";

        ICO_LEFT.classList.add("fa-arrow-left");
        ICO_RIGHT.classList.add("fa-arrow-right");

        IC_HEART.classList.remove('bicRed');
        IC_HEART.classList.add('bicWhite');
    }
    if (menuName == 'Profile' || menuName == 3) {
        WIN_PROFILE.style.display = "block";
        IC_USER.classList.remove('bicRed');
        IC_USER.classList.add('bicWhite');
    }
}

function toggleMoreLessInfo() {
    if (WIN_BASIC.style.display === "none") {
        WIN_BASIC.style.display = "block";
        WIN_MORE.style.display = "none";

        LESSMORE.innerHTML = 'MORE INFO';
    } else {
        WIN_BASIC.style.display = "none";
        WIN_MORE.style.display = "block";

        LESSMORE.innerHTML = 'LESS INFO';
    }

}

function answerMatch(answer) {
    SLIDER_range.value = 2;
    ICO_RIGHT.style.display = ICO_LEFT.style.display = "block";
    console.log(answer)

    setTimeout(function () {
        POPUP_MATCH_DIV.style.display = "none";
        document.getElementById("myRange").disabled = false;
    }, 250);

}

SLIDER_range.oninput = function () {
    // console.log(this.value);
    // let answer = this.value == 3 ? 'You Said Yes' : 'You Said No';
    ICO_RIGHT.style.display = ICO_LEFT.style.display = "block";

    if (this.value == 3) {
        document.getElementById("myRange").disabled = true;
    }
    // console.log(ICO_LEFT);
    if (this.value == 1)
        ICO_LEFT.style.display = "none";
    if (this.value == 3) {
        ICO_RIGHT.style.display = "none";
        POPUP_MATCH_DIV.style.display = "block"
    }
}


// var clickAnimations = document.getElementsByClassName('click-css-event'),
//     pfx = ["webkit", "moz", "MS", "o", ""],
//     hovered = false;

// console.log("HWiwefwfiuwefh");
// console.log(clickAnimations);