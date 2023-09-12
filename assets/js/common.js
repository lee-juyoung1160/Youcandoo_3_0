const wHeader = document.querySelector('.w-header');
const menu =  document.querySelectorAll('.menu');
const closeMenu = document.querySelector('.close-menu');
const mHeader = document.querySelector('.m-header');

// 헤더 스크롤시 css 변화
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 30) {
        if (!wHeader.classList.contains('active')) {
            wHeader.classList.add('active');
        }
        if (!mHeader.classList.contains('active')) {
            mHeader.classList.add('on');
        }
    }
    else {
        wHeader.classList.remove('active');
        mHeader.classList.remove('on');
    }
});

// 모바일 메뉴
for (let i=0; i<menu.length; i++) {
    menu[i].addEventListener('click', function () {
        !mHeader.classList.contains('active');
        mHeader.classList.add('active');
    });
    closeMenu.addEventListener('click', function () {
        mHeader.classList.remove('active');
        menu[i].classList.remove('active');
    });
}

