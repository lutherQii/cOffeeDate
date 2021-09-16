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

WIN_SWIPING.style.display = WIN_MATCHING.style.display = WIN_MORE.style.display = SLIDER.style.display = "none";

function changeMenu(menuName) {
    WIN_SWIPING.style.display = WIN_MATCHING.style.display = WIN_PROFILE.style.display = SLIDER.style.display = "none";

    ICO_LEFT.classList.remove("fa-times","fa-arrow-left");
    ICO_RIGHT.classList.remove("fa-check","fa-arrow-right")

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
        WIN_MATCHING.style.display = SLIDER.style.display ="block";

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