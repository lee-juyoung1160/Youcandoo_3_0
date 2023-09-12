// 헤더 스크롤시 사라지는 스크립트
const header = document.querySelector(".web-header");
window.addEventListener('scroll', function () {
	if (window.pageYOffset >= 20) {
		!header.classList.contains('active');
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
});

