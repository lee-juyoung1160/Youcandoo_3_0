document.addEventListener('DOMContentLoaded', function () {
	createList();
	mainMotion();
	scrollMotion();
	mainSlide();
	mobileDeepLink();
});
function createList() {
	$.ajax({
		url: api_server_url+"/v1.0/web/doit/list",
		type: "POST",
		async:false,
		dataType: "json",
		error : function(e) {

		},
		success:function(row) {
			const doitSection = document.getElementById("doit-list");
			let images = [
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/bed.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/baby.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/couch.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/domore.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/hotairvballoons.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/house.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/orientalbirds.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/shore.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/spark.jpg?resource_version=<?=$resource_version?>',
				'https://service.yanadoocdn.com/youcandoo/assets/images/randomimage/sunset.jpg?resource_version=<?=$resource_version?>'
			];
			let html= "";
			for(let i=0; i<row.length; i++) {
				let obj = row[i];
				const slide = document.createElement("div");
				const wrap = document.createElement("div");
				const imgWrap = document.createElement("div");
				const img = document.createElement("img");
				const textWrap = document.createElement("div");
				const tag =document.createElement("p");
				const title = document.createElement("p");
				const user = document.createElement("p");
				const icon = document.createElement("img");
				const data = document.createElement("span")
				slide.classList.add("swiper-slide");
				wrap.classList.add("wrap");
				imgWrap.classList.add("img-wrap");
				if(obj.doit_image_url !== "") {
					img.src = obj.doit_image_url;
				}else {
					img.src = images[Math.floor(Math.random()*images.length)];
				}
				textWrap.classList.add("text-wrap");
				tag.classList.add("tag");
				title.classList.add("title");
				user.classList.add("user");
				icon.classList.add("icon");
				data.classList.add("data");
				icon.src = "https://service.yanadoocdn.com/youcandoo/assets/images/user-icon.png?resource_version=<?=$resource_version?>";
				doitSection.appendChild(slide);
				slide.appendChild(wrap);
				wrap.appendChild(imgWrap);
				imgWrap.appendChild(img);
				wrap.appendChild(textWrap);
				textWrap.appendChild(tag);
				textWrap.appendChild(title);
				textWrap.appendChild(user);
				user.appendChild(icon);
				user.appendChild(data);
				tag.textContent = obj.doit_tags;
				title.textContent = obj.doit_title;
				data.textContent = obj.member_count + "명 참여";
			}
			fnBestSlide();
		}
	});
}
// best-doit slide
const fnBestSlide = function () {
	const bestSlide = new Swiper('.best-doit-slide', {
		slidesPerView: 1.5,
		centeredSlides: false,
		freeMode: true,
		loop: false,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			// when window width is >= 712px
			712: {
				slidesPerView: 2.5,
				centeredSlides: false,
				slidesPerGroup: 3,
			},
			// when window width is >= 1024px
			1024: {
				slidesPerView: 3,
				centeredSlides: false,
				slidesPerGroup: 3,
				loop: true,
			}
		}
	});
}
// main motion : 로드될때 한번만 실행
function mainMotion() {
	const mainSlider = document.querySelector('.main .col-2');
	const mainTitle = document.querySelector('.main .main-title');
	!mainSlider.classList.contains('active');
	!mainTitle.classList.contains('active');
	mainSlider.classList.add('active');
	mainTitle.classList.add('active');
}
// main 스크롤 이벤트
function scrollMotion() {
	const windowH = window.innerHeight;
	const marginT = windowH / 1.5;

	const bestDoitTitle = document.querySelectorAll('.best-doit h2.main-title');
	const bestDoitTop = document.querySelector('.best-doit').offsetTop;
	const guideDoitTitle = document.querySelector('.guide-doit-row h2.main-title');
	const guideDoitTop = document.querySelector('.guide-doit-row').offsetTop;
	const guideDoitMainMockUp = document.querySelector('.guide-doit-row .col-2');
	const guideCreateTitle = document.querySelector('.guide-create-row h2.main-title');
	const guideCreateTop = document.querySelector('.guide-create-row').offsetTop;
	const guideCreateMainMockUp = document.querySelector('.main .guide-create-row .col-2');
	const guideProTitle = document.querySelector('.guide-promotion h2.main-title');
	const guideProTop = document.querySelector('.guide-promotion').offsetTop;
	const guideProMainMockUp = document.querySelector('.main .guide-promotion .col-2');
	const guideExchangeTitle = document.querySelector('.guide-exchange h2.main-title');
	const guideExchangeTop = document.querySelector('.guide-exchange').offsetTop;

	window.addEventListener('scroll', function (){
		for (let index=0; index < bestDoitTitle.length; index++) {
			if(window.pageYOffset >= bestDoitTop - marginT) {
				!bestDoitTitle[index].classList.contains('active');
				bestDoitTitle[index].classList.add('active');
			}else {
				bestDoitTitle[index].classList.remove('active');
			}
		}
		if (window.pageYOffset >= guideDoitTop - marginT) {
			!guideDoitTitle.classList.contains('active');
			guideDoitTitle.classList.add('active');
			!guideDoitMainMockUp.classList.contains('active');
			guideDoitMainMockUp.classList.add('active');
		}else {
			guideDoitTitle.classList.remove('active');
			guideDoitMainMockUp.classList.remove('active');
		}
		if (window.pageYOffset >= guideCreateTop - marginT) {
			!guideCreateTitle.classList.contains('active');
			guideCreateTitle.classList.add('active');
			!guideCreateMainMockUp.classList.contains('active');
			guideCreateMainMockUp.classList.add('active')
		}else {
			guideCreateTitle.classList.remove('active');
			guideCreateMainMockUp.classList.remove('active');
		}
		if (window.pageYOffset >= guideProTop - marginT ) {
			!guideProTitle.classList.contains('active');
			guideProTitle.classList.add('active');
			!guideProMainMockUp.classList.contains('active');
			guideProMainMockUp.classList.add('active');
		}else {
			guideProTitle.classList.remove('active');
			guideProMainMockUp.classList.remove('active');
		}
		if (window.pageYOffset >= guideExchangeTop - marginT) {
			!guideExchangeTitle.classList.contains('active');
			guideExchangeTitle.classList.add('active');
		}else {
			guideExchangeTitle.classList.remove('active');
		}
	});
}
// 메인 슬라이드 이벤트
function mainSlide() {
	// 두잇참여 메인 슬라이드
	const guideDoitMainSlide = new Swiper('.guide-doit-main-slide', {
		slidesPerView: 1,
		loop: true,
		centeredSlides: true,
		autoplay: {
			delay: 1800,
			disableOnInteraction: false,
		},
	});
	// 두잇 개설 가이드 메인 슬라이드
	const guideCreateSlide = new Swiper('.guide-create-main-slide', {
		slidesPerView: 1,
		loop: true,
		centeredSlides: true,
		autoplay: {
			delay: 1800,
			disableOnInteraction: false,
		},
	});
	// 프로모션 가이드 메인 슬라이드
	const guidePromotionSlide = new Swiper('.guide-promotion-main-slide', {
		slidesPerView: 1,
		loop: true,
		centeredSlides: true,
		autoplay: {
			delay: 1800,
			disableOnInteraction: false,
		},
	});
}
// 모바일 전용 앱 다운로드 버튼 생성
function mobileDeepLink() {
	const mobileAppDown = document.querySelector('.mobile-app-down');
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
}
