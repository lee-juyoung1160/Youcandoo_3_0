window.addEventListener('DOMContentLoaded', () => {
	packageInfoSwipe();
	yndModal();
});
/*window.addEventListener("load", function(){
	gnbDetail(2);
	gnbBaseSet(2);
});*/
window.addEventListener("scroll", () => { onScrollWindow(); toggleFixedNavMo(); });
document.querySelector(".btn-copy-link").addEventListener("click", copyEvent);
document.querySelector(".btn-move-faq").addEventListener("click", moveToFaq);
document.querySelector(".btn-move-contents").addEventListener("click", moveToContents);
// 야나두 팝업 가리기
window.addEventListener("load", () => {
	document.getElementById('adn_closed_wrap_contents').style.display = "none";
	document.getElementById('adn_panel_').style.display = "none";
});
// scroll event
function onScrollWindow() {
	const animation01 = document.querySelector('.package-detail-contents');
	const animation01Top = animation01.offsetTop;
	const bannerFloating = document.querySelector('.floating-banner');

	if (pageYOffset >= animation01Top - 500) {bannerFloating.classList.add('active');}
	else {bannerFloating.classList.remove('active');}
}

//copy link
function copyEvent() {
	let tmpTextarea = document.createElement('textarea');
	tmpTextarea.value = window.location.href;
	document.body.appendChild(tmpTextarea);
	tmpTextarea.select();
	tmpTextarea.setSelectionRange(0, 9999);
	document.execCommand('copy');
	document.body.removeChild(tmpTextarea);
	alert("URL 복사가 완료되었습니다.");
}

const innerWidth = window.innerWidth;
function moveToFaq() {
	const faq =  document.querySelector('.faq');
	const faqTop = faq.offsetTop;
	window.scrollTo({top: faqTop -128, left:0, behavior:'smooth'});
}

function moveToContents() {
	const faq =  document.querySelector('.package-detail-contents');
	const faqTop = faq.offsetTop;
	window.scrollTo({top: faqTop -128, left:0, behavior:'smooth'});
}

// m fixed package nav
let lastScrollTop = 0;
function toggleFixedNavMo() {
	const scrollTop = window.pageYOffset;
	(scrollTop < 1 || scrollTop > lastScrollTop) ? removeClassFixed() : addClassFixed();
	lastScrollTop = scrollTop;
}
function addClassFixed()
{ document.querySelector('.package-nav').classList.add('fixed'); }

function removeClassFixed()
{ document.querySelector('.package-nav').classList.remove('fixed'); }

//썸네일
function packageInfoSwipe() {
	new Swiper(".package-thumbnail-slide", {
		slidesPerView: 1,
		loop: true,
		autoplay: { delay: 6000,},
		pagination: {
			el: ".swiper-pagination",
		},
	});
}
// m nav - tab
new Swiper('.swiper-container-nav', {
	slidesPerView: 2.9,
	freeMode: true,
	watchSlidesProgress: true,
	observer: true,
	observeParents: true,
});

