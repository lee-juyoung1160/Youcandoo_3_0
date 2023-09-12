// 페이지 로드시 gtag 실행
document.addEventListener('DOMContentLoaded', function () {
    gtag('event', 'conversion', {'send_to': 'AW-824253219/wlHACO2C2OEBEKO2hIkD'});
});

// 모바일 전용 앱 다운로드 버튼 생성
const mobileAppDown = document.querySelector('.deep-linking');
window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 30) {
        if (!mobileAppDown.classList.contains('active')) {
            mobileAppDown.classList.add('active');
        }
    }
    else {
        mobileAppDown.classList.remove('active');
    }
});

// facebook Add Pixel Events to the button's click handler
// mobileAppDown.addEventListener('click', function () {
//     fbq('trackCustom', 'appInstall', { promotion: '2020_thanksgiving'});
// },false);

// google AW deeplink
function promotionDeepLink() {
    $.ajaxSetup({ async: false });
    $.get( "/analytics?btn=mobile_app_link_at_promotion" );
    gtag('event','button',{'event_category':'promotion','event_label':'mobile_app_link_at_promotion'});
    gtag('event', 'conversion', {'send_to': 'AW-824253219/vzh3CMCryeEBEKO2hIkD'});
    fbq('trackCustom', 'appInstall', { promotion: '2020_thanksgiving'});
    window.location.href = "https://youcandoo.page.link/fudd";
}

